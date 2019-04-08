const path = require("path")

module.exports = function getManifest(args, cwd) {
	let manifestPath
	if (args.length) {
		if (path.isAbsolute(args[0])) {
			manifestPath = args[0]
		} else {
			manifestPath = path.join(cwd, args[0])
		}
		if (path.basename(manifestPath) !== "manifest.json") {
			manifestPath = path.join(manifestPath, "manifest.json")
		}
	} else {
		manifestPath = path.join(cwd, "manifest.json")
	}

	let manifest
	try { manifest = require(manifestPath) } 
	catch (e) { manifest = undefined }
	
	return { manifest, manifestPath }
}