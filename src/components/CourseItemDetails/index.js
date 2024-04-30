import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {techData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseItemData()
  }

  getCourseItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
      this.setState({
        techData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCourseItemDetails = () => {
    const {techData} = this.state
    const {imageUrl, name, description} = techData

    return (
      <div className="blog-info">
        <h1 className="name">{name}</h1>
        <img className="image" src={imageUrl} alt={name} />
        <p className="content">{description}</p>
      </div>
    )
  }

  renderCourseItemDetailsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItemDetails()
      case apiStatusConstants.failure:
        return this.renderCourseItemDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default CourseItemDetails
