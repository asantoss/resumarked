import React, { Component } from 'react';
var CodeMirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');
const ReactMarkdown = require('react-markdown');



const defaults = {
    markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
    javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};

export default class MarkdownWriter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: defaults.markdown,
            mode: 'markdown',
            readOnly: false
        };
    }
    changeMode(e) {
        var mode = e.target.value;
        this.setState({
            mode: mode,
            value: defaults[mode]
        });
    }
    toggleReadOnly() {
        this.setState({
            readOnly: !this.state.readOnly
        }, () => this.refs.editor.focus());
    }

    handleNewTemplate(e) {

    }

    handleTextChange(e) {
        this.setState({ ...this.state, value: e.target.value })
    }
    render() {
        var options = {
            lineNumbers: true,
            readOnly: this.state.readOnly,
            mode: this.state.mode
        }
        const templatesArray = [{ name: 'T1', id: 0 }, { name: 'T2', id: 1 }, { name: 'T3', id: 2 }]
        return (
            <div>
                <div className="buttons_list">
                    {templatesArray.map((template, i) => <button className="templateBtn" key={i} value={template.id}>{template.name}</button>)}
                </div>
                <div className="writer_container">
                    <div className="writer_input">
                        <textarea onChange={this.handleTextChange.bind(this)} className="mdTextArea">
                        </textarea>
                        <div>
                            <CodeMirror ref="editor" value={this.state.value} onChange={this.handleTextChange.bind(this)} options={options} autoFocus={true} />
                            <div style={{ marginTop: 10 }}>
                                <select onChange={this.changeMode} value={this.state.mode}>
                                    <option value="markdown">Markdown</option>
                                    <option value="javascript">JavaScript</option>
                                </select>
                                <button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
                            </div>
                        </div>
                    </div>
                    {/* <Markdown className="writer_parser" markup={this.state.value} /> */}
                    <ReactMarkdown className="writer_parser" source={this.state.value} escapeHtml={false} />
                </div>
            </div>
        )
    }
}
