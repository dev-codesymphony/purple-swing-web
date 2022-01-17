import { DialogType, IDialogContentProps, IModalProps } from "@fluentui/react";

export const dialogContentProps: IDialogContentProps = {
    type: DialogType.close,
    closeButtonAriaLabel: 'Close',
};

export const modalProps: IModalProps = {
    styles: {
        main: {
            maxWidth: "1023px!important",
            minWidth: "756px!important",
            padding: "10px!important",
            paddingTop: "10px!important",
            borderRadius: "20px",
            color:"black"
        }
    }
}
