import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiButtonDirective,
    TuiErrorModule,
    TuiLinkDirective,
    TuiNotificationModule,
    TuiSvgComponent,
} from '@taiga-ui/core';
import {TuiAvatarComponent, TuiFieldErrorPipeModule, TuiFilesModule} from '@taiga-ui/kit';

import {TuiInputFilesExample1} from './examples/1';
import {TuiInputFilesExample2} from './examples/2';
import {TuiInputFilesExample3} from './examples/3';
import {TuiInputFilesExample4} from './examples/4';
import {TuiInputFilesExample5} from './examples/5';
import {TuiInputFilesExample6} from './examples/6';
import {TuiInputFilesExample7} from './examples/7';
import {ExampleTuiInputFilesComponent} from './input-files.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiFilesModule,
        TuiLinkDirective,
        TuiButtonDirective,
        TuiSvgComponent,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiNotificationModule,
        TuiAvatarComponent,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(ExampleTuiInputFilesComponent)),
        FormsModule,
    ],
    declarations: [
        ExampleTuiInputFilesComponent,
        TuiInputFilesExample1,
        TuiInputFilesExample2,
        TuiInputFilesExample3,
        TuiInputFilesExample4,
        TuiInputFilesExample5,
        TuiInputFilesExample6,
        TuiInputFilesExample7,
    ],
    exports: [ExampleTuiInputFilesComponent],
})
export class ExampleTuiFilesModule {}
