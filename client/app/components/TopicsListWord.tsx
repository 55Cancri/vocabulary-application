import React from 'react'
import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'

export const TopicsListWord = props => {
  const { word, tags, details } = props
  return (
    <div key={word.uid} className="word-group-in-main-list">
      <Link to={`/word/${word.uid}`}>
        <h3 className="word-name">{word.word}</h3>
        {details !== undefined && (
          <div className="tags">
            {details &&
              tags !== undefined &&
              tags.filter(tag => tag.wordOwner === word.uid).map(tag => (
                <div
                  key={tag.uid}
                  style={{
                    margin: 0,
                    padding: `5px 10px`,
                    borderRadius: 3,
                    backgroundColor: tag.color
                  }}
                >
                  <p className="tag-text">{tag.tag}</p>
                </div>
              ))}
            {!details &&
              tags !== undefined &&
              tags.filter(tag => tag.wordOwner === word.uid).map(tag => (
                <div
                  key={tag.uid}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: tag.color
                  }}
                />
              ))}
          </div>
        )}
        <p className="word-definition">{word.definition}</p>
      </Link>
      {details !== undefined &&
        details &&
        word.images !== undefined &&
        word.images.length > 0 && (
          <ImageGallery
            items={word.images.map(image => ({
              original: image.url,
              thumbnail: image.url
            }))}
            // useBrowserFullscreen={false}
            showThumbnails={false}
            showPlayButton={false}
          />
        )}
    </div>
  )
}

export default TopicsListWord
