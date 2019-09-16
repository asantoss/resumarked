import React, { Component } from 'react';

require('dotenv').config()




export default class SavePDF extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isGenerating: false,
            isGenerated: false,
            url: ''
        }
    }
    convertHtmlToPdf(e) {
        const html = document.querySelector('#root > div > div:nth-child(3) > div > div.writer_parser').innerHTML;
        this.setState({ ...this.state, isGenerating: !this.state.isGenerating, isGenerated: false })
        fetch('https://v2018.api2pdf.com/chrome/html', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': process.env.REACT_APP_SECRET_CODE //Get your API key from https://portal.api2pdf.com
            },
            body: JSON.stringify({ html: html, inlinePdf: true, scale: 0.75, fileName: `${this.props.fileName}resume.pdf` })
        }).then(res => res.json())
            .then(res => {
                this.setState({ ...this.state, isGenerating: !this.state.isGenerating, isGenerated: true, url: res.pdf })
            });
    }
    render() {
        return (
            <div>
                <button onClick={this.convertHtmlToPdf.bind(this)}>{this.state.isGenerating ? 'Generating ...' : 'Generate PDF'}</button>
                {this.state.isGenerated && <a href={this.state.url} target="blank">Download as PDF</a>}
            </div>
        );
    }
}

