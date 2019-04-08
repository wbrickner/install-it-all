const getManifest = require("./get-manifest")
const chalk = require("chalk")
const path = require("path")
const { exec } = require("child_process")
const prettyMs = require("pretty-ms")

const trueErrorRegExp = new RegExp(/(npm ERR!)/g)

function getProjectDirectoryName(project) {
	let pathComponents = project["relative-path"].split(path.sep)
	return pathComponents[pathComponents.length - 1]
}

function buildCommand(options) {
	let cmd = "npm"
	if (options.noUpdate) {
		cmd += " install"
		if (options.noDev) { cmd += " --only=prod" }
		else if (options.onlyDev) { cmd += " --only=dev" }
	}
	else {
		cmd += " update"
		if (options.noDev) { cmd += " --only=prod" }
		else if (options.onlyDev) { cmd += " --dev --only=dev" }
		else { cmd += " --dev" } // dev deps don't get updated unless you explicitly ask for them
	}

	return cmd
}

function runInstallCommand(project, manifestDirectory, options) {
	let projectDirectory = path.join(manifestDirectory, project["relative-path"])

	return new Promise((resolve, reject) => {
		// update existing packages, install missing packages, and also process dev dependencies
		exec(`cd ${projectDirectory} && ${buildCommand(options)}`, (err, stdout, stderr) => {
			if (err) { return reject(`Error occurred in directory: ${projectDirectory}. \nThis is likely an install-it-all bug. \nRaw error:`, err) }
			if (trueErrorRegExp.test(stderr)) { return reject(`Error occurred in directory: ${projectDirectory}. \nThis is likely an issue with npm, or one of this project's dependencies. \nRaw error:`, stderr) }
			resolve()
		})
	})
}

function prettyDuration(startTime) {
	let durration = process.hrtime(startTime)
	return prettyMs(durration[0] * 1E3 + durration[1] * 1E-6)
}

module.exports = async function InstallItAll(args, cwd, options, startTime) {
	let { manifest, manifestPath } = getManifest(args, cwd)
	if (manifest === undefined) { return console.error(chalk.underline("Manifest not found")) }

	const projectCount = (manifest.projects || []).length
	console.log(`Manifest contains ${chalk.underline(projectCount)} project${projectCount === 1 ? "" : "s"}${projectCount === 0 ? "..." : ":\n"}`)

	const manifestDirectory = path.dirname(manifestPath)
	const promises = new Array(projectCount)

	for (var j = 0; j < projectCount; ++j) {
		console.log(
			"  " + 
			chalk.green(manifest.projects[j].name || getProjectDirectoryName(manifest.projects[j])) + 
			(
				manifest.projects[j].description ? 
					("  |  " + chalk.italic(manifest.projects[j].description)) : 
					("")
			)
		)

		promises[j] = runInstallCommand(manifest.projects[j], manifestDirectory, options)
	}

	console.log("")
	console.log("Installing...")

	Promise.all(promises)
		.then(() => console.log("\nDone! Took:", prettyDuration(startTime)))
		.catch((err) => console.error("\nAn error occurred during installation. Error:", err))

}