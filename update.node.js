#!/usr/bin/env node

// Script to download all Google fonts
// and clean-up the output.

const https             = require('https');
const fs                = require('fs');
const path              = require('path');
const { mkdirp }        = require('mkdirp');
const googWebFontDlFork = require('goog-webfont-dl-fork');

const init = async () => {
	const archiveList = await getArchive()
	const googList = await getFontsList();

	// filter the archiveList out of the googList
	const newFonts = googList.filter( font => archiveList.indexOf( font ) < 0 );
	await getFonts(newFonts);
	updateArchive([...archiveList, ...newFonts]);
};

const updateArchive = list => {
	fs.writeFileSync('archive', list.join("\n"), {
		encoding: "utf8"
	});
}

const getFonts = async (newFonts) => {
	return new Promise(resolve => {
		Promise.all(newFonts.map(font => downloadFont(font))).then(() => {
			resolve();
		});
	});
};

const downloadFont = font => {
	return new Promise(async (resolve, reject) => {
		const ltr  = font.substr(0,1).toUpperCase();
		const ltrPath = `${process.cwd()}/FONTS/${ltr}`;
		const fulPath = path.resolve(`${ltrPath}/${font}`);
		mkdirp.sync(fulPath);
		await googWebFontDlFork({
			font: font,
			destination: fulPath
		});
		resolve(font);
	});
}

const getArchive = async () => {
	const archive = fs.readFileSync('archive');
	// return the list split and filtering out empties
	return archive.toString().split("\n").filter( x => x );
};

const getFontsList = async () => {
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
