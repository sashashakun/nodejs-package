#!/usr/bin/env node
import 'babel-polyfill';
import main from '..';
import program from 'commander';

const { args } = program.parse(process.argv);

main(args[0]).then(res => console.log(res));
