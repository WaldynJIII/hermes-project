import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPodBeanForm from './EditPodBeanForm';
import EditWordPressForm from './EditWordPressForm';
import StepperBar from '../StepperBar/StepperBar';
import swal from 'sweetalert';

// import Grid from '@material-ui/core/Grid';

import './EditPage.css';
import Grid from '@material-ui/core/Grid';


class EditPage extends Component {

    state = {

        podbean: {
            piece: this.props.reduxStore.editReducer.formReducer.podbean.piece,
            title: this.props.reduxStore.editReducer.formReducer.podbean.title,
            description: this.props.reduxStore.editReducer.formReducer.podbean.description,
        },
        wordpress: {
            title: this.props.reduxStore.editReducer.formReducer.wordpress.title,
            blog: this.props.reduxStore.editReducer.formReducer.wordpress.blog,
            tags: this.props.reduxStore.editReducer.formReducer.wordpress.tags,
            categories: this.props.reduxStore.editReducer.formReducer.wordpress.categories,
        }

    }
    componentDidMount = () => {
        this.props.dispatch({ type: "STEP_THREE" })
    }

    handleClick = (event) => {
        // saves edit page history to the reducer and advances to the next page
        this.props.dispatch({ type: "SET_PODBEAN", payload: this.state.podbean })
        this.props.dispatch({ type: "SET_WORDPRESS", payload: this.state.wordpress })
        event.preventDefault();
        console.log('Next button clicked on edit page');
        this.props.history.push('/review-page');
    }
    handleChangeP = (key) => (event) => {
        // handle change that is passed down to the Podbean component
        console.log('event happened')
        this.setState({
            ...this.state,
            podbean: {
                ...this.state.podbean,
                [key]: event.target.value,
            }
        });
    }
    handleChangeW = (key) => (event) => {
        // handle change that is passed down to the Wordpress component
        console.log('event happened')
        this.setState({
            ...this.state,
            wordpress: {
                ...this.state.wordpress,
                [key]: event.target.value,
            }
        });
    }
    //use the same function as the other pages for this button
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


        return (
            <>
                <div>
                    <StepperBar activeStep='3'></StepperBar>


                </div>
                <Grid
                    container
                    alignItems="center"
                    direction="column"



                >
                    <Grid item >
                        <Grid
                            container
                            direction="column"
                            spacing={40}
                        >
                            <Grid item xs={12}>
                                <EditPodBeanForm handleChangeP={this.handleChangeP} state={this.state}
                                // passes a handlechange to the podbean child component, and the current state.
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <EditWordPressForm handleChangeW={this.handleChangeW} state={this.state}
                                // passes a handlechange to the wordpress child component, and the current state.
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item >
                        <Grid
                            container
                            alignItems="center"
                            direction="row"
                            spacing={16}
                        >
                            <Grid item>
                                <button className="myButton" onClick={this.handleCancelButton}>CANCEL</button>
                                {/* Cancel button */}
                            </Grid>
                            <Grid item>
                                {/* button to advance to the next page */}
                                <button className="myButton" onClick={this.handleClick}>FINISH EDITING</button>
                            </Grid>
                        </Grid>


                    </Grid>

                </Grid>

            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore: reduxStore
});

export default connect(mapReduxStoreToProps)(EditPage);