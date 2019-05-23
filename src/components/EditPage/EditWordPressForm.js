import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import SimpleModalWrapped from './transcriptModal'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    containerWordpress: {
        display: 'flex',
        background: 'white',
        flexWrap: 'wrap',
        [theme.breakpoints.up("md")]: {
            width: '800px'
        },
        [theme.breakpoints.down("sm")]: {
            width: '600px'
        },  
        height: '600px',
       
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        
    },
   
});



class EditWordPressForm extends Component {
    //held in reducer and in local state and is required for the Api to work

    state = {
        
        
     
        
    }
    
    render() {

        console.log(this.state.transcription)

        const { classes } = this.props;

       

        return (
            <>

                <Grid
                    container
                    direction="column"
                    justify="left"
                >
                    <Grid item xs={12}>
                        
                        <h4 className="textFontEditPage">Enter the required information for WordPress.</h4>
                        
                    </Grid>

                    <Grid item xs={12}>
                        
                        <form onSubmit={this.addNewBlog} className={classes.containerWordpress}>
                            <Grid item item xs={12}>
                                <img className="icons" src="images/logo/WordPress.png" alt="wordpress_link" />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="blog name"
                                    label="Name of Blog"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.props.state.wordpress.blog}
                                    onChange={this.props.handleChangeW('blog')}
                                    // curried handlechange for the blog title field
                                />
                                      <button className='sButton' onClick={this.props.testFillBlog}>  big button   </button>
      
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="title"
                                    label="Name of Article"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.props.state.wordpress.title}
                                    onChange={this.props.handleChangeW('title')}
                                    // curried handlechange for the article title field
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="tags"
                                    label="Tags"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.props.state.wordpress.tags}
                                    onChange={this.props.handleChangeW('tags')}
                                    // curried handlechange for the tags text field
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="categories"
                                    label="Categories"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.props.state.wordpress.categories}
                                    onChange={this.props.handleChangeW('categories')}
                                    // curried handlechange for the categories text field
                                />


                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="transcription"
                                    label="Transcription"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rowsMax="8"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.props.reduxStore.editReducer.transcriptReducer.transcript}
                                    // grabs the transcription from the reduer on completion
                                    
                                />
                            </Grid>

                            <Grid item xs={12}>
                            <SimpleModalWrapped/>
                            </Grid>
        
                        </form>
                    </Grid>
                </Grid>

            </>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})

export default connect(mapReduxStoreToProps)(withStyles(styles)(EditWordPressForm));