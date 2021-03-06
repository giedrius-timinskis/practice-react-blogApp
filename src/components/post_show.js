import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostShow extends Component {
    // Check posts_new for description
    static contextTypes =  {
        router: PropTypes.object
    };

    componentWillMount() {
        // Param is coming from URL
        this.props.fetchPost(this.props.params.id);
    }

    render () {
        const { post } = this.props;
        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >Delete</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then( () => {
                // Blog post has been successfully created.
                // Navigate user to index
                this.context.router.push('/');
            });;
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
