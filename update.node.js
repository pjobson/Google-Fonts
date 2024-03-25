#!/usr/bin/env node

// Script to download all Google fonts
// and clean-up the output.

const https = require('https');
const fs    = require('fs');

const init = async () => {
	const archiveList = await getArchive()
	const googList = await getFonts();
	// filter the archiveList out of the googList
	const newFonts = googList.filter( font => archiveList.indexOf( font ) < 0 );

};

const getArchive = async () => {
	const archive = fs.readFileSync('archive');
	// return the list split and filtering out empties
	return archive.toString().split("\n").filter( x => x );
};

const getFonts = async () => {
	const URL = 'https://fonts.google.com/metadata/fonts';
	let fonts = "";
	return new Promise(resolve => {
		const req = https.get(URL, resp => {
			resp.on('data', chunk => {
				if (chunk) {
					fonts += chunk.toString();
				}
			});
			resp.on('end', () => {
				// Convert fonts to JSON
				// get the family names from familyMetadataList
				resolve(JSON.parse(fonts).familyMetadataList.map( font => font.family ));
			});
		});
	});
};

init();



/*
echo "Installing goog-webfont-dl"
//

echo "Getting fonts list"
// wget ""

// Get each family from the fonts list and put it in an array
declare -a FONTLIST=`jq '.familyMetadataList | .[] | .family' fonts`
#declare -a ARCHIVE=`cat archived`

// for i in "${FONTLIST[@]}"
// do
//     echo "Getting $i"
// done
*/
