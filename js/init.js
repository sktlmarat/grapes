const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height: '400px',
    width: 'auto',
    storageManager: false,
    panels: {defaults: []},
    blockManager: {
        appendTo: '#blocks',
    },
    layerManager: {
        appendTo: '.layers-container'
    },
    // We define a default panel as a sidebar to contain layers
    panels: {
        defaults: [
            {
                id: 'layers',
                el: '.panel__right',
                // Make the panel resizable
                resizable: {
                    maxDim: 350,
                    minDim: 200,
                    tc: 0, // Top handler
                    cl: 1, // Left handler
                    cr: 0, // Right handler
                    bc: 0, // Bottom handler
                    // Being a flex child we need to change `flex-basis` property
                    // instead of the `width` (default)
                    keyWidth: 'flex-basis',
                }
            },
            {
                id: 'panel-switcher',
                el: '.panel__switcher',
                buttons: [{
                    id: 'show-layers',
                    active: true,
                    label: 'Layers',
                    command: 'show-layers',
                    // Once activated disable the possibility to turn it off
                    togglable: false,
                }, {
                    id: 'show-style',
                    active: true,
                    label: 'Styles',
                    command: 'show-styles',
                    togglable: false,
                }],
            }
        ]
    },
    selectorManager: {
        appendTo: '.styles-container'
    },
    styleManager: {
        appendTo: '.styles-container',
        sectors: [{
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
                {
                    // Type of the input,
                    // options: integer | radio | select | color | slider | file | composite | stack
                    type: 'integer',
                    name: 'The width', // Label for the property
                    property: 'width', // CSS property (if buildProps contains it will be extended)
                    units: ['px', '%'], // Units, available only for 'integer' types
                    defaults: 'auto', // Default value
                    min: 0, // Min value, available only for 'integer' types
                }
            ]
        }, {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'justify-content', 'color', 'font-size'],
        }]
    },
});
editor.Commands.add('show-layers', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row) { return row.querySelector('.layers-container') },

    run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
    },
    stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
    },
});
editor.Commands.add('show-styles', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row) { return row.querySelector('.styles-container') },

    run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
    },
    stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
    },
});


editor.Components.addType('custom-btn', {
    model: {
        defaults: {
            tagName: 'div',
            style: {
                display: 'flex'
            },
            layerable: false,
            selectable: false,
            editable: false,
            components: [
                {
                    tagName: 'button',
                    type: 'text',

                    style: {
                        background: 'rgba(5, 202, 182, 1)',
                        'font-size': '15px; color: white',
                        padding: '14px 42px 14px 42px',
                        border: '2px solid rgba(5, 202, 182, 0)',
                        'font-family': "'Overpass', sans-serif",
                    },
                    content: 'BUTTON ->'
                }
            ]
        },
        init () {
            this.on('change:style', this.changeStyles)
        },
        changeStyles () {
            this.get('components').each(child => console.log(child))
            changestyle
        }
    }
})



editor.BlockManager.add('button2', {
    id: 'button2',
    name: 'button2',
    label: 'Button2',
    content: {
        tagName: 'div',
        style: {
            display: 'flex'
        },
        name: 'Button',
        components: [
            {
                tagName: 'button',
                type: 'text',
                hoverable: false,
                selectable: false,
                draggable: false,
                layerable: false,
                editable: true,
                style: {
                    background: 'rgba(5, 202, 182, 1)',
                    'font-size': '15px; color: white',
                    padding: '14px 42px 14px 42px',
                    border: '2px solid rgba(5, 202, 182, 0)',
                    'font-family': "'Overpass', sans-serif",
                },
                content: 'BUTTON ->'
            }
        ]
    }
})



