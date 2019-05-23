import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


//creating the text editor and making functionality
class TranscriptEditor extends Component {
    state = {
        text: this.props.reduxStore.editReducer.transcriptReducer.transcription,
    }



    handleChange = (html) => {
        this.setState({ editorHtml: html });

    }

    modules = {
        // the different modules we are using for react quill
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
        ],
    }

    formats = [
        // 
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    render() {
        console.log(this.props.reduxStore.editReducer.transcriptReducer.transcription)
        return (
            <div>

                <ReactQuill theme="snow"
                // the reactQuill component
                    value={this.props.reduxStore.editReducer.transcriptReducer.transcription}
                    modules={this.modules}

                    formats={this.formats}
                    
                >

                </ReactQuill>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})

export default connect(mapReduxStoreToProps)(TranscriptEditor);