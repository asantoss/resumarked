import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { firebaseApp } from '../firebase';
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
            userName: 'Alexander Santos',
            HTMLOption: false
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
    changeHTMLOption(e) {
        const option = e.target.value === 'yes' ? false : true
        this.setState({
            ...this.state,
            HTMLOption: option
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
    }
    handleLocalSave(e) {
        localStorage.setItem('resumarkedDocument', this.state.value);
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
        const templatesArray = this.state.templates;
        const resume = !!localStorage.getItem('resumarkedDocument') && localStorage.getItem('resumarkedDocument');
        return (
            <div>
                <p>Welcome to Resumake, this is an app to help you on your developer journey. Within this editor you can use a mix of HTML,CSS & Markdown to help your resume presentation.</p>
                <div className="writer_container">
                    <div className="writer_input">
                        <div style={{ marginTop: 10 }}>
                            <div className="selects_list">
                                <label htmlFor="templates">Template: </label>
                                <select onChange={this.handleNewTemplate.bind(this)} id="templates" >
                                    {templatesArray && templatesArray.map((template, i) => <option className="templateBtn" key={i} value={template.name}>{template.name}</option>)}
                                </select>
                                <label htmlFor="themeSelect">Theme: </label>
                                <select id="themeSelect" onChange={this.changeTheme.bind(this)} value={this.state.theme}>
                                    <option value="monokai">Monokai</option>
                                    <option value="material">Material</option>
                                    <option value="paraiso-dark">Paraiso Dark</option>
                                    <option value="darcula">Darcula</option>
                                    <option value="ambiance">Ambiance</option>
                                </select>
                                <label htmlFor="htmlOpt">Html On: </label>
                                <select onChange={this.changeHTMLOption.bind(this)} id="htmlOpt">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select></div>
                            <div className="buttons_list">
                                <button onClick={this.toggleReadOnly.bind(this)}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
                                <button onClick={this.handleLocalSave.bind(this)}>{this.state.value === resume ? 'Saved' : 'Save'}</button>
                                <button onClick={this.handleLocalLoad.bind(this)}>{resume && 'Load'}</button>
                                <SavePDF />
                            </div>
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
                    <ReactMarkdown className="writer_parser" source={this.state.value} escapeHtml={this.state.HTMLOption} />
                </div>
            </div>
        )
    }
}
