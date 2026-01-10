import Controller from "sap/ui/core/mvc/Controller";
import MyDialogHanlder, { MyDialogHandler$SubmitEvent } from "com/myorg/reuselib/controller/MyDialogHandler";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace miyasuta.consumerapp.controller
 */
export default class View1 extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onOpenDialog(): void {
        const dialogHandler = new MyDialogHanlder();
        dialogHandler.attachSubmit((event: MyDialogHandler$SubmitEvent) => {
            const message = event.getParameter("message");
            MessageToast.show(`Dialog submitted with message: ${message}`);
        });
        dialogHandler.open();

    }
}