import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import firebaseApp from '../firebase';

const db = firebaseApp.firestore();

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/monokai.css');
require('codemirror/theme/paraiso-dark.css');
require('codemirror/theme/darcula.css');
require('codemirror/theme/ambiance.css');

const ReactMarkdown = require('react-markdown');



const defaults = {
    markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy '
};

export default class MarkdownWriter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: defaults.markdown,
            mode: 'markdown',
            readOnly: false,
            theme: 'material',
            saving: false
        };
    }
    componentDidMount() {
        db.collection('templates').doc('bnWflPGPTsee8qU6kupD').get().then((doc => {
            if (doc.exists) {
                this.setState({ ...this.state, value: doc.data().template })
            }
        }))
    }

    changeMode(e) {
        var mode = e.target.value;
        this.setState({
            ...this.state,
            mode: mode,
        });
    }
    changeTheme(e) {
        var theme = e.target.value;
        this.setState({
            ...this.state,
            theme: theme
        })
    }
    toggleReadOnly() {
        this.setState({
            ...this.state, readOnly: !this.state.readOnly
        })
    }

    handleNewTemplate(e) {

    }

    handleDBSave(e) {
        this.setState({ ...this.state, saving: !this.state.saving, readOnly: !this.state.readOnly })
        db.collection('templates').doc('bnWflPGPTsee8qU6kupD').set({
            name: "Alexander Santos",
            template: this.state.value
        }).then(() => {
            this.setState({ ...this.state, saving: !this.state.saving, readOnly: !this.state.readOnly })
        })
    }

    handleTextChange(value) {
        this.setState({ ...this.state, value: value })
    }
    render() {
        var options = {
            lineNumbers: true,
            readOnly: this.state.readOnly,
            mode: this.state.mode,
            theme: this.state.theme
        }
        const templatesArray = [{ name: 'T1', id: 0 }, { name: 'T2', id: 1 }, { name: 'T3', id: 2 }]
        return (
            <div>
                <div className="writer_container">
                    <div className="writer_input">
                        <div style={{ marginTop: 10 }} className="buttons_list">
                            <select onChange={this.changeMode.bind(this)} value={this.state.mode}>
                                <option value="markdown">Markdown</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                            <select onChange={this.handleNewTemplate.bind(this)} >
                                {templatesArray.map((template, i) => <option className="templateBtn" key={i} value={template.id}>{template.name}</option>)}
                            </select>
                            <select onChange={this.changeTheme.bind(this)} value={this.state.theme}>
                                <option value="monokai">Monokai</option>
                                <option value="material-darker">Material</option>
                                <option value="paraiso-dark">Paraiso Dark</option>
                                <option value="darcula">Darcula</option>
                                <option value="ambiance">Ambiance</option>
                            </select>
                            <button onClick={this.toggleReadOnly.bind(this)}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
                            <button onClick={this.handleDBSave.bind(this)}>{this.state.saving ? 'Saving...' : 'Save'}</button>
                        </div>
                        <CodeMirror
                            className="mdTextArea"
                            value={this.state.value}
                            options={options}
                            onBeforeChange={(editor, data, value) => {
                                this.setState({ ...this.state, value: value });
                            }}
                            onChange={(editor, data, value) => {
                            }}
                        />
                    </div>
                    <ReactMarkdown className="writer_parser" source={this.state.value} escapeHtml={false} />
                </div>
            </div>
        )
    }
}
