# Install It All

Run `npm install` in many projects at once, with one command.

Very useful for npm organizations.

Installation:

```shell
$ npm install -g @digital-springboard/install-it-all
```
# Usage

`install-it-all` will look for a `manifest.json` file, either at the path provided or in the current directory if no path is provided.

### Example (look in current directory for `manifest.json`)
```shell
$ install-it-all
```

### Example (use provided path)

The argument to IIA is either the path to `manifest.json`, or to a directory containing `manifest.json`.

```shell
$ install-it-all ~/cool-projects/
```

Or you could do:

```shell
$ install-it-all ~/cool-projects/manifest.json
```
## Options

```shell
Usage: install-it-all [path/to/project/manifest.json]

Options:
  -v --version  output the version number
  --no-update   Prevent updating the dependencies (respects semver string)
  --no-dev      Prevent updating / installing dev dependencies
  --only-dev    Only update / install dev dependencies
  -h, --help    output usage information
```


# `manifest.json` Structure

```json
{
  "projects": [
    {
      "name": "warp-drive",        // optional; auto-discovered if absent
      "description": "It's fast.", // optional; auto-discovered if absent
      "path": "../warp-drive/"     // required; can be absolute or relative to manifest.json
    },
    {
      "path": "../shrink-ray/"     // required; can be absolute or relative to manifest.json
    }
  ]
}
```

# License [MIT]

Copyright (©) 2019 Digital Springboard, LLC.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


