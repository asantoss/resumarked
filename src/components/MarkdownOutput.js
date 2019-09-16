import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import firebaseApp from '../firebase';
import SavePDF from './SavePDF';

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
require('codemirror/addon/wrap/hardwrap');

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
            theme: 'monokai',
            saving: false,
            userName: 'Alexander Santos'
        };
    }
    componentDidMount() {
        db.collection('templates').where('template', '==', true).get().then(response => {
            let templates = []
            response.forEach(doc => templates.push({ name: doc.data().name, data: doc.data().data }))
            this.setState({ ...this.state, templates: templates });
        })
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
        const template = e.target.value
        db.collection('templates').doc('bnWflPGPTsee8qU6kupD').get().then((doc => {
            if (doc.exists) {
                this.setState({ ...this.state, value: doc.data()[template] })
            }
        }))

    }
    handleLocalLoad(e) {
        const resume = localStorage.getItem('resumarkedDocument');
        this.setState({ ...this.state, value: resume })

<<<<<<< HEAD
    }
    handleLocalSave(e) {
        // db.collection('templates').doc('bnWflPGPTsee8qU6kupD').set({
        //     name: "Alexander Santos",
        //     template: this.state.value
        // }).then(() => {
        //     this.setState({ ...this.state, saving: !this.state.saving, readOnly: !this.state.readOnly })
        // })
        localStorage.setItem('resumarkedDocument', this.state.value);
=======
    handleDBSave(e) {
        this.setState({ ...this.state, saving: !this.state.saving, readOnly: !this.state.readOnly })
        db.collection('templates').doc('alexanderDoc').set({
            template: this.state.value
        }).then(() => {
            this.setState({ ...this.state, saving: !this.state.saving, readOnly: !this.state.readOnly })
        })
>>>>>>> master
    }

    handleTextChange(value) {
        this.setState({ ...this.state, value: value })
    }
    render() {
        const options = {
            lineNumbers: true,
            readOnly: this.state.readOnly,
            mode: this.state.mode,
            theme: this.state.theme,
            lineWrapping: true,
        }
        const templatesArray = this.state.templates
        return (
            <div>
                <p>Welcome to Resumake, this is an app to help you on your developer journey. Within this editor you can use a mix of HTML,CSS & Markdown to help your resume presentation.</p>
                <div className="writer_container">
                    <div className="writer_input">
                        <div style={{ marginTop: 10 }} className="buttons_list">
                            <input type="text" name="documentName" placeholder="Document Name" onChange={(e) => { this.setState({ ...this.state, docName: e.target.value }) }} id="" />
                            <select onChange={this.changeMode.bind(this)} value={this.state.mode}>
                                <option value="markdown">Markdown</option>
                            </select>
                            <select onChange={this.handleNewTemplate.bind(this)} >
                                {templatesArray && templatesArray.map((template, i) => <option className="templateBtn" key={i} value={template.name}>{template.name}</option>)}
                            </select>
                            <select onChange={this.changeTheme.bind(this)} value={this.state.theme}>
                                <option value="monokai">Monokai</option>
                                <option value="material">Material</option>
                                <option value="paraiso-dark">Paraiso Dark</option>
                                <option value="darcula">Darcula</option>
                                <option value="ambiance">Ambiance</option>
                            </select>
                            <button onClick={this.toggleReadOnly.bind(this)}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
<<<<<<< HEAD
                            <button onClick={this.handleLocalSave.bind(this)}>{this.state.saving ? 'Saving...' : 'Save'}</button>
                            <button onClick={this.handleLocalLoad.bind(this)}>{this.state.loading ? 'Loading' : 'Load'}</button>
=======
                            <button onClick={this.handleDBSave.bind(this)}>{this.state.saving ? 'Saving...' : 'Save'}</button>
                            <SavePDF fileName={this.state.userName} pdfstatus={false} />
>>>>>>> master
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
                    <ReactMarkdown className="writer_parser" id={'jsx-template'} source={this.state.value} escapeHtml={false} />
                </div>
            </div>
        )
    }
}
