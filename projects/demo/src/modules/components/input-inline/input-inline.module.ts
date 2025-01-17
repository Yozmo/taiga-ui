import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiAutoFocusDirective} from '@taiga-ui/cdk';
import {TuiButtonDirective} from '@taiga-ui/core';
import {TuiInputInlineModule} from '@taiga-ui/kit';

import {TuiInputInlineExample1} from './examples/1/component';
import {TuiInputInlineExample2} from './examples/2/component';
import {TuiInputInlineExample3} from './examples/3/component';
import {ExampleTuiInputInlineComponent} from './input-inline.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TuiButtonDirective,
        TuiInputInlineModule,
        TuiAutoFocusDirective,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(ExampleTuiInputInlineComponent)),
    ],
    declarations: [
        ExampleTuiInputInlineComponent,
        TuiInputInlineExample1,
        TuiInputInlineExample2,
        TuiInputInlineExample3,
    ],
    exports: [ExampleTuiInputInlineComponent],
})
export class ExampleTuiInputInlineModule {}
