/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2018 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

/**
 * Selector that identifies the node that contains the WCM mode state
 *
 */
const WCM_MODE_META_SELECTOR:string = 'meta[property="cq:wcmmode"]';

/**
 * The editor is in one of the edition modes
 */
const EDIT_MODE:string = 'edit';

/**
 * The editor is in preview mode
 */
const PREVIEW_MODE:string = 'preview';

/**
 * Returns the current WCM mode
 *
 * <p>Note that the value isn't, as of the date of this writing, updated by the editor</p>
 *
 *
 */
function getWCMMode() {
    const wcmModeMeta:any = document.head.querySelector(WCM_MODE_META_SELECTOR);
    return wcmModeMeta && wcmModeMeta.content;
}

/**
 * Helper functions for interacting with the AEM environment
 *
 */
const Utils = {

    /**
     * Is the app used in the context of the AEM Page editor
     *
     */
    isInEditor() {
        const wcmMode = getWCMMode();
        return wcmMode && (EDIT_MODE === wcmMode || PREVIEW_MODE === wcmMode);
    }
};

export default Utils;
