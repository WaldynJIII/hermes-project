import React, { Component } from 'react';
import { connect } from 'react-redux';
import TranscriptEditor from './TranscriptEditor';

import swal from 'sweetalert';
import 'react-quill/dist/quill.snow.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class TranscriptPage extends Component {
    state = {
        text: this.props.reduxStore.editReducer.transcriptReducer.transcript,
    }
    handleClick = (event, text, delta, source, editor) => {
        event.preventDefault();
      this.props.dispatch({type: "SET_TRANSCRIPT", payload: this.state.text})
    //   sets the tanscript reducer to the updated transcript
        this.props.handleClose()
    }

    handleCancelButton = () => {
        console.log('in SweetAlert Cancel Button');
        swal({
            title: "Are you sure?",
            text: "Careful, you will lose all progress and information forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    this.props.history.push('/connect');
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }





    handleChange=( text, delta, source, editor) => {
       
        const content = editor.getText(text);
        // fetches the content of the editor and sets it to the current state.
        this.setState({ ...this.state,
            text: content });
        console.log(content)
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
        ],
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    render() {
        // console.log('button clicked', this.editor.getText());
        console.log(this.state)
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    spacing={16}
                    marginLeft='5px'
                    marginRight='5px'
                >

                    <Grid item>
                        <Typography variant="h6" gutterBottom>
                            Edit your transcription for WordPress.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Paper>


                            <ReactQuill theme="snow"
                                ref='editor'
                                defaultValue={this.state.text}
                                modules={this.modules}

                                formats={this.formats}
                                onChange={this.handleChange}
                            >

                            </ReactQuill>



                        </Paper>

                    </Grid>
                    <Grid item>
                        <button className="myButton" onClick={this.handleCancelButton}>CANCEL</button>
                    </Grid>
                    <Grid item>
                        <button className="myButton" onClick={this.handleClick}>SUBMIT EDITS</button>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})

export default connect(mapReduxStoreToProps)(TranscriptPage);