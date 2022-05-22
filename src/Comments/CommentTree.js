import React, {Component} from 'react';
import Comment from "../Comments/Comment"

class CommentTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.paramKey,
            isLoaded: false,
            comment: props.comment,
            userUpvoted: props.userUpvoted,
            title_submission: props.title_submission
        };
    
    }

    componentDidMount() {
        this.setState({isLoaded: true})
    }

    render() {
        if (!this.state.isLoaded) return
        return (
            <table width="85%">
                <tbody>
                    <tr>
                        <td>
                            <Comment userUpvoted={this.state.userUpvoted.find(data => data === this.state.comment.id)} title_submission={this.state.title_submission} comment={this.state.comment}/> {/*falta url*/}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{'\u00A0\u00A0\u00A0'}</td>
                                        <td>{'\u00A0\u00A0\u00A0'}</td>
                                        <td>{'\u00A0\u00A0\u00A0'}</td>
                                        <td >
                                            {this.state.comment.comments.map(subComment => (
                                                <CommentTree key={subComment.created_at} paramKey={subComment.created_at+1} userUpvoted={this.state.userUpvoted} title_submission={this.state.title_submission} comment={subComment}/>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
export default CommentTree;