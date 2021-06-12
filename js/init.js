const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height: '700px',
    width: 'auto',
    storageManager: false,
    panels: {defaults: []},
    blockManager: {
        appendTo: '#blocks',
        blocks: []
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
editor.BlockManager.add('my-block-id', {
    id: 'box',
    label: 'Box',
    content: {
        tagName: 'div',
        draggable: true,
        style: {
            width: '100%',
            display: 'flex',
            'align-content': 'center',
            height: 'auto',
        },
        attributes: {class: 'my-box'},
        components: [
            {
                tagName: 'div',
                style: {
                    width: '100%',
                    height: '100%',
                    display: 'flex !important',
                    'align-items': 'center',
                    'justify-content': 'center',
                },
                components: [
                    {
                        tagName: 'img',
                        resizable: true,
                        style: {
                          display: 'block'
                        },
                        attributes: { src: 'http://www.mandysam.com/img/random.jpg'}
                    },
                    {
                        tagName: 'p',
                        style: {
                            display: 'block'
                        },
                        type: 'text',
                        content: 'Sample text'
                    },
                    {
                        type: 'text',
                        tagName: 'button',
                        style: {
                            display: 'block'
                        },
                        editable: true,
                        resizable: true,
                        content: 'Check it out'
                    },
                    ]
            },
        ]
    }
})
editor.BlockManager.add('my-img', {
    id: 'my-img',
    label: 'Image',
    content: {
        tagName: 'div',
        draggable: true,
        style: {
            width: '100%',
            display: 'flex',
            'align-content': 'center',
            height: 'auto',
        },
        components: [
            {
                tagName: 'img',
                attributes: { src: 'http://www.mandysam.com/img/random.jpg' }
            },
        ]
    }
})
editor.BlockManager.add('my-btn', {
    id: 'my-btn',
    label: 'Button',
    content: {
        tagName: 'div',
        draggable: true,
        style: {
            width: '100%',
            display: 'flex',
            'align-content': 'center',
            height: 'auto',
        },
        components: [
            {
                name: 'Button',
                tagName: 'button',
                style: {
                    background: 'aqua',
                    height: '50px',
                    width: '30%',
                },
                type: 'text',
                editable: true,
                content: 'Sample button'
            },
        ]
    }
})
