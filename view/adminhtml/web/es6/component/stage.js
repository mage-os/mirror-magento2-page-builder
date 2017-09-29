import EditableArea from './stage/structural/editable-area';
import Row from './stage/structural/row';
import _ from 'underscore';
import DataStore from "./data-store";
import $t from "mage/translate";
/**
 * Stage class
 *
 * @author Dave Macaulay <dmacaulay@magento.com>
 */
export default class Stage extends EditableArea {
    /**
     * Stage constructor
     *
     * @param parent
     * @param stageContent
     */
    constructor(parent, stageContent) {
        super();
        this.active = true;
        this.serializeRole = 'stage';
        this.setChildren(stageContent);
        this.stage = this;
        this.parent = parent;
        this.showBorders = parent.showBorders;
        this.userSelect = parent.userSelect;
        this.loading = parent.loading;
        // Create our state and store objects
        this.store = new DataStore();
        window.store = this.store;
        _.bindAll(this, 'onSortingStart', 'onSortingStop');
        this.on('sortingStart', this.onSortingStart);
        this.on('sortingStop', this.onSortingStop);
    }
    /**
     * Run the build system to initiate from existing structures
     */
    build() {
        // @todo implement new storage format proposal build system
        this.addRow(this);
        this.ready();
    }
    /**
     * The stage has been initiated fully and is ready
     */
    ready() {
        this.emit('stageReady');
        this.children.valueHasMutated();
        this.loading(false);
    }
    /**
     * Add a row to the stage
     *
     * @param self
     * @param data
     * @returns {Row}
     */
    addRow(self, data) {
        let row = new Row(self, self);
        this.store.update(row.id, data);
        this.addChild(row);
        return row;
    }
    openTemplateManager() {
        // @todo
    }
    addComponent() {
        // @todo
    }
    /**
     * Event handler for any element being sorted in the stage
     */
    onSortingStart() {
        this.showBorders(true);
    }
    /**
     * Event handler for when sorting stops
     */
    onSortingStop() {
        this.showBorders(false);
    }
    /**
     * Remove a child from the observable array
     *
     * @param child
     */
    removeChild(child) {
        if (this.children().length == 1) {
            this.parent.alertDialog({
                title: $t('Unable to Remove'),
                content: $t('You are not able to remove the final row from the content.')
            });
            return;
        }
        super.removeChild(child);
    }
}
