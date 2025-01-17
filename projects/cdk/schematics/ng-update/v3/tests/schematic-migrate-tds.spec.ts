import {join} from 'node:path';

import {HostTree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import type {TuiSchema} from '@taiga-ui/cdk/schematics/ng-add/schema';
import {
    createProject,
    createSourceFile,
    resetActiveProject,
    saveActiveProject,
    setActiveProject,
} from 'ng-morph';

import {TAIGA_VERSION} from '../../../ng-add/constants/versions';
import {makeAngularJsonWithAssets} from '../../../utils/make-angular-json-with-assets';

const collectionPath = join(__dirname, '../../../migration.json');

describe('ng-update angular.json', () => {
    let host: UnitTestTree;
    let runner: SchematicTestRunner;

    beforeEach(() => {
        host = new UnitTestTree(new HostTree());
        runner = new SchematicTestRunner('schematics', collectionPath);
    });

    it('include @taiga-ui/proprietary-icons inside a package.json', async () => {
        setActiveProject(createProject(host));

        createSourceFile(
            'package.json',
            `{"dependencies": {"@angular/core": "~13.0.0", "@taiga-ui/proprietary-icons": "${TAIGA_VERSION}"}}`,
            {overwrite: true},
        );

        createSourceFile(
            'angular.json',
            makeAngularJsonWithAssets(`
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/proprietary-icons/src",
                "output": "assets/taiga-ui/icons"
              }`),
        );

        saveActiveProject();

        const tree = await runner.runSchematic(
            'updateToV3',
            {'skip-logs': process.env['TUI_CI'] === 'true'} as Partial<TuiSchema>,
            host,
        );

        expect(tree.readContent('angular.json')).toEqual(
            makeAngularJsonWithAssets(`
                {
                  "glob": "**/*",
                  "input": "node_modules/@taiga-ui/proprietary-icons/src",
                  "output": "assets/taiga-ui/icons"
                },
                {
                  "glob": "**/*",
                  "input": "node_modules/@taiga-ui/proprietary-tds-icons/src",
                  "output": "assets/taiga-ui/icons"
                }`),
        );
    });

    it('included proprietary-tds-icons now', async () => {
        setActiveProject(createProject(host));

        createSourceFile(
            'package.json',
            `{"dependencies": {"@angular/core": "~13.0.0", "@taiga-ui/proprietary-icons": "${TAIGA_VERSION}"}}`,
        );

        createSourceFile(
            'angular.json',
            makeAngularJsonWithAssets(`
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/proprietary-tds-icons/src",
                "output": "assets/taiga-ui/icons"
              },
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/proprietary-icons/src",
                "output": "assets/taiga-ui/icons"
              }`),
        );

        saveActiveProject();

        const tree = await runner.runSchematic(
            'updateToV3',
            {'skip-logs': process.env['TUI_CI'] === 'true'} as Partial<TuiSchema>,
            host,
        );

        expect(tree.readContent('angular.json')).toEqual(
            makeAngularJsonWithAssets(`
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/proprietary-tds-icons/src",
                "output": "assets/taiga-ui/icons"
              },
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/proprietary-icons/src",
                "output": "assets/taiga-ui/icons"
              }`),
        );
    });

    it("doesn't include @taiga-ui/proprietary-icons inside a package.json", async () => {
        setActiveProject(createProject(host));

        createSourceFile(
            'package.json',
            '{"dependencies": {"@angular/core": "~13.0.0"}}',
        );

        createSourceFile(
            'angular.json',
            makeAngularJsonWithAssets(`
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/proprietary-icons/src",
                "output": "assets/taiga-ui/icons"
              }`),
        );

        saveActiveProject();

        const tree = await runner.runSchematic(
            'updateToV3',
            {'skip-logs': process.env['TUI_CI'] === 'true'} as Partial<TuiSchema>,
            host,
        );

        expect(tree.readContent('angular.json')).toEqual(
            makeAngularJsonWithAssets(`
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/proprietary-icons/src",
                "output": "assets/taiga-ui/icons"
              }`),
        );
    });

    afterEach(() => resetActiveProject());
});
