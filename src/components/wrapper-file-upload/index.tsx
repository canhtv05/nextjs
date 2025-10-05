import { NextPage } from 'next'
import React, { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'

interface TProps {
  children: ReactNode
  uploadFunc: (file: File) => void
  objectAcceptFiles?: Record<string, string[]>
}

const WrapperFileUpload: NextPage<TProps> = ({ children, uploadFunc, objectAcceptFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: objectAcceptFiles ? objectAcceptFiles : {},
    onDrop: acceptedFiles => {
      uploadFunc(acceptedFiles[0])
    }
  })

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

export default WrapperFileUpload
