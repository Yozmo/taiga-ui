import {Directive} from '@angular/core';
import {AbstractTuiValueTransformer, tuiProvide} from '@taiga-ui/cdk';
import {TUI_NUMBER_VALUE_TRANSFORMER} from '@taiga-ui/kit';

@Directive({
    selector: '[absTransformer]',
    providers: [tuiProvide(TUI_NUMBER_VALUE_TRANSFORMER, AbsTransformer)],
})
export class AbsTransformer extends AbstractTuiValueTransformer<
    number | null,
    number | null
> {
    public override fromControlValue(value: number | null): number | null {
        return value && Math.abs(value);
    }

    public override toControlValue(value: number | null): number | null {
        return value && -1 * Math.abs(value);
    }
}
