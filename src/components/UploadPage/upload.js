import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import swal from 'sweetalert';
import '../App/App.css';
import StepperBar from '../StepperBar/StepperBar'
import './Upload.css';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';


const styles = theme => ({
    containerUpload: {
        display: 'flex',
        background: 'white',
        flexWrap: 'wrap',
        [theme.breakpoints.up("sm")]: {
            width: '600px'
        },
        height: '200px',
        justify:"center",

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        
    },
  
    
});


class UploadPage extends Component {
    
    state = {
        file: null,
        uploading: false,
    }

  componentDidMount = () => {
        this.props.dispatch({ type: "STEP_TWO" })
    }
  

    handleOnChange = (e) => {
        console.log('handleOnChange');
        console.log(e.target.files);
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        console.log('file', file);

        this.uploadRequest(file);
    }
    
 
    uploadRequest =  (file) => {
        console.log(file)
        console.log('uploadRequest hit');
        
        let data = new FormData();
        data.append('file', file );
        console.log('data', data);
    
       
        this.props.dispatch({type: "SEND_AUDIO", payload: data })
        this.props.dispatch({type: "UPDATE_PODBEAN_MEDIA", payload: data})
        this.props.history.push('/edit-page');
    };

    //Sweet Alert Code
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
    
    render() {
        const { classes } = this.props;

        return (

            <>
                <StepperBar activeStep='2'></StepperBar>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <form
                            className={classes.containerUpload}
                            action="/googleCloud/upload"
                            encType="multipart/form-data"
                            method="POST"
                            onSubmit={this.uploadRequest}
                        >
                            <Grid item xs={12}>
                                
                                <input
                                        id="userFile"
                                        type="file"
                                        name="userFile"
                                        onChange={this.handleOnChange} 
                                        className="inputFile"                                      
                                    />
                                
                                <label 
                                    htmlFor="userFile"
                                    className="inputLabel"
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg>
                                    </span>
                                    Choose File
                                </label>
                                
                            </Grid>
                            
                            <Grid item xs={12}>
                                
                                <button className="myButton" onClick={this.handleCancelButton}>CANCEL</button>
                                <input className="myButton" type="submit" value="UPLOAD" />
                                   
                            </Grid>
                            
                        </form>  
                    </Grid>
                                    
            </Grid>
            </>
        );
    };
};
const mapReduxStateToProps = reduxState => ({
    reduxState
});
export default connect(mapReduxStateToProps)(withStyles(styles)(UploadPage));
