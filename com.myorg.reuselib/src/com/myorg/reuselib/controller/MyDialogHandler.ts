import Dialog from "sap/m/Dialog";
import Event from "sap/ui/base/Event";
import EventProvider from "sap/ui/base/EventProvider";
import Fragment from "sap/ui/core/Fragment";
import JSONModel from "sap/ui/model/json/JSONModel";

export interface MyDialogHandler$SubmitEventParameters {
    message: string;
}

export type MyDialogHandler$SubmitEvent = Event<
    MyDialogHandler$SubmitEventParameters,
    MyDialogHandler
>;

type SubmitEventHandler = (event: MyDialogHandler$SubmitEvent) => void;

export default class MyDialogHandler extends EventProvider {
    private _dialog: Dialog | null = null;
    private _model: JSONModel;

    constructor() {
        super();
        this._model = new JSONModel({
            message: ""
        });
    }

    public open(): void {
        // load fragment
        Fragment.load({
            name: "miyasuta.mylibrary.fragments.MyDialog",
            controller: this
        }).then(dialog => {
            this._dialog = dialog as Dialog;
            this._dialog.setModel(this._model, "dialogModel");
            // open dialog
            this._dialog.open();
        });
    }

    public attachSubmit(handler: SubmitEventHandler): this {
        this.attachEvent("submit", handler);
        return this;
    }

    public detachSubmit(handler: SubmitEventHandler): this {
        this.detachEvent("submit", handler);
        return this;
    }

    private submit(): void {
        const data = this._model.getData() as { message: string };
        // fire submit event with message value
        this.fireEvent("submit", { message: data.message });
        // close dialog
        this.close();
    }

    public close(): void {
        // close dialog
        this._dialog?.close();

        // destroy dialog and initialize the model
        this._dialog?.destroy();
        this._dialog = null;
        this._model.setData({
            message: ""
        });
    }
}