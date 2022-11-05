import { Handler } from 'express';
import logger from '../../logger';
import { Defendant } from '../../models';
import * as path from 'path';
import * as fs from 'fs';

export const get: Handler = async (req, res) => {
	const csvFilePath = path.resolve(__dirname, '../../example.csv');

	console.log(csvFilePath);
	const rawFile = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
	const data = rawFile.split('\n');
	const colNames = data[0].split(',');

	const result = new Map();
	const rows = data.slice(1);
	colNames.forEach((colName) => {
		result.set(colName, []);
	});
	console.log(rows);

	// TODO: set up query params so Bekah can filter results based on contact date or scheduled date

	try {
		const defendants = await Defendant.find({});
		res.send(defendants);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to get defendants');
	}
};
