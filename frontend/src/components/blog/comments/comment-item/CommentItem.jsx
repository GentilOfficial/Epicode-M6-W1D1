import { Button, Form } from 'react-bootstrap'

const CommentItem = ({
  comment,
  isEditing,
  editForm,
  onEditChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  isOwner,
}) => {
  return (
    <>
      <div className="fw-bold">
        {comment.author.name} - {comment.rate}
      </div>

      {isEditing ? (
        <>
          <Form.Control
            as="textarea"
            rows={2}
            name="comment"
            value={editForm.comment}
            onChange={(e) =>
              onEditChange({
                ...editForm,
                comment: e.target.value,
              })
            }
          />

          <Form.Select
            className="mt-2"
            name="rate"
            value={editForm.rate}
            onChange={(e) =>
              onEditChange({
                ...editForm,
                rate: Number(e.target.value),
              })
            }
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                Rate: {rate}
              </option>
            ))}
          </Form.Select>

          <div className="mt-2 d-flex gap-2">
            <Button size="sm" variant="success" onClick={onSaveEdit}>
              Salva
            </Button>

            <Button size="sm" variant="secondary" onClick={onCancelEdit}>
              Annulla
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>{comment.comment}</div>

          {isOwner && (
            <div className="mt-2 d-flex gap-2">
              <Button size="sm" variant="outline-primary" onClick={onStartEdit}>
                Modifica
              </Button>

              <Button size="sm" variant="outline-danger" onClick={onDelete}>
                Elimina
              </Button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CommentItem
