import { useContext, useEffect, useState } from 'react'
import { Alert, ListGroup, Spinner } from 'react-bootstrap'
import { AuthContext } from '../../../../providers/AuthenticationProvider'
import Pagination from '../../../pagination/Pagination'

import CommentForm from '../comment-form/CommentForm'
import CommentItem from '../comment-item/CommentItem'

const initialForm = { comment: '', rate: 1 }
const pageSize = 5

const CommentList = ({ postId }) => {
  const { token, logout, user } = useContext(AuthContext)

  const [comments, setComments] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState(initialForm)

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(initialForm)

  const [error, setError] = useState(null)

  const fetchComments = async (page) => {
    if (!postId || !token) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}/comments?currentPage=${page}&pageSize=${pageSize}`,
        {
          headers: { Authorization: token },
        },
      )

      if (res.status === 401) {
        logout()
        throw new Error('Sessione scaduta')
      }

      if (!res.ok) {
        throw new Error('Errore nel caricamento commenti')
      }

      const json = await res.json()

      setComments(Array.isArray(json.data) ? json.data : [])
      setTotalPages(json.pages?.totals ?? 1)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [postId])

  useEffect(() => {
    fetchComments(currentPage)
  }, [postId, currentPage])

  const createComment = async () => {
    if (!form.comment.trim()) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error('Errore durante la creazione del commento')
      }

      const json = await res.json()
      const created = json.comment ?? json.data ?? json

      fetchComments(currentPage)

      setForm(initialForm)
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const deleteComment = async (id) => {
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}/comments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      })

      if (!res.ok) {
        throw new Error('Errore durante la cancellazione del commento')
      }

      fetchComments(currentPage)
    } catch (e) {
      setError(e.message)
    }
  }

  const startEdit = (comment) => {
    setEditingId(comment._id)
    setEditForm({
      comment: comment.comment,
      rate: comment.rate,
    })
  }

  const saveEdit = async () => {
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${postId}/comments/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(editForm),
      })

      if (!res.ok) {
        throw new Error('Errore durante la modifica del commento')
      }

      await res.json()

      fetchComments(currentPage)
    } catch (e) {
      setError(e.message)
    } finally {
      setEditingId(null)
      setEditForm(initialForm)
    }
  }

  const isOwner = (comment) => comment.author._id === user.id || comment.author.id === user.id

  if (loading) return <Spinner animation="border" className="mx-auto" />

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

      <div className="mt-3">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  )
}

export default CommentList
