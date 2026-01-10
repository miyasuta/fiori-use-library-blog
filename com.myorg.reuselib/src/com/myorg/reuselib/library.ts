/*!
 * ${copyright}
 */

import ObjectPath from "sap/base/util/ObjectPath";
import Lib from "sap/ui/core/Lib";

/**
 * Initialization Code and shared classes of library com.myorg.reuselib.
 */

// delegate further initialization of this library to the Core
// Hint: sap.ui.getCore() must still be used here to support preload with sync bootstrap!
Lib.init({
	name: "com.myorg.reuselib",
	version: "${version}",
	dependencies: [ // keep in sync with the ui5.yaml and .library files
		"sap.ui.core"
	],
	types: [
		// your types here
	],
	interfaces: [],
	controls: [
		// your controls here
	],
	elements: [],
	noLibraryCSS: true, // if no CSS is provided, you can disable the library.css load here
	apiVersion: 2,
});

// get the library object from global object space because all enums must be attached to it to be usable as UI5 types
// FIXME: this line is planned to become obsolete and may need to be removed later
const thisLib: { [key: string]: unknown } = ObjectPath.get("com.myorg.reuselib") as { [key: string]: unknown };