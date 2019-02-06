<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace Magento\PageBuilderDataMigration\Setup\DataConverter\Renderer;

use Magento\PageBuilderDataMigration\Setup\DataConverter\RendererInterface;
use Magento\PageBuilderDataMigration\Setup\DataConverter\StyleExtractorInterface;

/**
 * Render column group to PageBuilder format
 */
class ColumnGroup implements RendererInterface
{
    /**
     * @inheritdoc
     */
    public function render(array $itemData, array $additionalData = []) : string
    {
        $rootElementAttributes = [
            'data-element' => 'main',
            'class' => 'pagebuilder-column-group',
            'style' => 'display: flex;',
            'data-content-type' => 'column-group',
            'data-appearance' => 'default',
        ];

        $rootElementHtml = '<div';
        foreach ($rootElementAttributes as $attributeName => $attributeValue) {
            $attributeValue = trim($attributeValue);
            $rootElementHtml .= $attributeValue ? " $attributeName=\"$attributeValue\"" : '';
        }
        $rootElementHtml .= '>' . (isset($additionalData['children']) ? $additionalData['children'] : '') . '</div>';

        return $rootElementHtml;
    }
}
