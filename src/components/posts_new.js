import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    // React passes down context similarly to props. Context is wayy more implicit though.
    // This will search for all the parents of the component until it finds a context of react-router
    // We use this to access router property implicitly

    // This is used to redirect user to home screen after a successful submit
    // (context is basically a global app 'props')
    static contextTypes =  {
        router: PropTypes.object
    };

    render() {
        // ReduxForm passed us some method to props
        const { fields: { title, categories, content}, handleSubmit } = this.props;

        return (
            // Hijack the submission to redirect first in the onSubmit, then execute handleSubmit
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>

            <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                <input type="text" className="form-control" {...title}/*<- destucture props on the input element*/ />
                <div className="text-help">{title.touched ? title.error : ''}</div>
                </div>


                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                <div className="text-help">{categories.touched ? categories.error : ''}</div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea type="text" className="form-control" {...content}/>
                    <div className="text-help">{content.touched ? content.error : ''}</div>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            <Link to='/' className="btn btn-danger">Cancel</Link>
            </form>
        );
    }

    onSubmit(props) {
        this.props.createPost(props)
            .then( () => {
                // Blog post has been successfully created.
                // Navigate user to index
                this.context.router.push('/');
            });
    }
}

// Custom validation for the form
function validate(values) {
    // If errors object has any entries, it will mark the form as invalid.
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a title';
    }

    if (!values.categories) {
        errors.categories = 'Enter a category';
    }

    if (!values.content) {
        errors.content = 'Enter some content';
    }

    return errors;
}

// connect the form to redux
// when using connect, 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// when using reduxForm, 1st argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
    form: 'PostsNew',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);
