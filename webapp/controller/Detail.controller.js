sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function(Controller, History, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {

        onInit: function() {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            this.byId("rating").reset();
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        },

        onNavBack: function() {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                let oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("overview", {}, true);
            }
        },

        onRatingChange: function (oEvent) {
            let fValue = oEvent.getParameter("value");
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            
            MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
        }

    });

});