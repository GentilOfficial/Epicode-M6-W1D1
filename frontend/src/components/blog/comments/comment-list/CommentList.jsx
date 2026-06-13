import { useContext, useEffect, useState } from 'react'
import { Alert, ListGroup, Spinner } from 'react-bootstrap'
import { AuthContext } from '../../../../providers/AuthenticationProvider'

import CommentForm from '../comment-form/CommentForm'
import CommentItem from '../comment-item/CommentItem'

const initialForm = { comment: '', rate: 1 }

const CommentList = ({ postId }) => {
  const { token, logout, user } = useContext(AuthContext)

  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(initialForm)

  const [error, setError] = useState(null)

  const fetchComments = async () => {
    if (!postId || !token) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}/comments`, {
        headers: { Authorization: token },
      })

      if (res.status === 401) {
        logout()
        throw new Error('Sessione scaduta')
      }

      const json = await res.json()
      setComments(Array.isArray(json.data) ? json.data : [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const createComment = async () => {
    if (!form.comment.trim()) return

    setSubmitting(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(form),
      })

      const json = await res.json()

      const created = json.comment ?? json.data ?? json

      setComments([...comments, { ...created, author: user }])
      setForm(initialForm)
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const deleteComment = async (id) => {
    await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}/comments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    })

    setComments(comments.filter((c) => c._id !== id))
  }

  const startEdit = (comment) => {
    setEditingId(comment._id)
    setEditForm({
      comment: comment.comment,
      rate: comment.rate,
    })
  }

  const saveEdit = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}/comments/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(editForm),
    })

    const updated = await res.json()

    setComments(comments.map((c) => (c._id === editingId ? { ...c, ...(updated.comment ?? updated) } : c)))

    setEditingId(null)
    setEditForm(initialForm)
  }

  const isOwner = (comment) => comment.author._id === user.id || comment.author.id === user.id

  if (loading) return <Spinner animation="border" />

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      <CommentForm
        form={form}
        onChange={(e) =>
          setForm((p) => ({
            ...p,
            [e.target.name]: e.target.value,
          }))
        }
        onSubmit={createComment}
        submitting={submitting}
      />

      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            <CommentItem
              comment={comment}
              isEditing={editingId === comment._id}
              editForm={editForm}
              onEditChange={setEditForm}
              onStartEdit={() => startEdit(comment)}
              onCancelEdit={() => setEditingId(null)}
              onSaveEdit={saveEdit}
              onDelete={() => deleteComment(comment._id)}
              isOwner={isOwner(comment)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default CommentList
