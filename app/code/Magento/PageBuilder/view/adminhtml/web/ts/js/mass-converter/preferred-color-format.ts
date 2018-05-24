/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import tinycolor from "tinycolor";
import ConverterInterface from "./converter-interface";

export default class PreferredColorFormat implements ConverterInterface {
    /**
     * Process data after it's read and converted by element converters
     *
     * @param {object} data
     * @param {object} config
     * @returns {object}
     */
    public fromDom(data: object, config: object): object {
        if (data.background_color !== "") {
            data.background_color = tinycolor(data.background_color).toString(data.background_color_format);
        }
        return data;
    }

    /**
     * Process data before it's converted by element converters
     *
     * @param {object} data
     * @param {object} config
     * @returns {object}
     */
    public toDom(data: object, config: object): object {
        data.background_color_format = tinycolor(data.background_color).getFormat();
        return data;
    }
}