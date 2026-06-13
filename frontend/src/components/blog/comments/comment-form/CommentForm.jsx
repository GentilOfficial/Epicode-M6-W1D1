import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const CHARS_MAX = 150

const CommentForm = ({ form, onChange, onSubmit, submitting }) => {
  const [charsCont, setCharsCount] = useState(0)
  useEffect(() => {
    setCharsCount(form.comment.length)
  }, [form])

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="mb-3"
    >
      <Form.Control
        as="textarea"
        rows={10}
        name="comment"
        placeholder="Scrivi un commento..."
        value={form.comment}
        onChange={onChange}
      />

      <div className="text-end">
        <small className={charsCont > CHARS_MAX ? 'text-danger' : 'text-muted'}>
          {charsCont}/{CHARS_MAX}
        </small>
      </div>

      <Form.Select className="mt-2" name="rate" value={form.rate} onChange={onChange}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <option key={rate} value={rate}>
            Rate: {rate}
          </option>
        ))}
      </Form.Select>

      <Button type="submit" size="sm" className="mt-2" disabled={submitting}>
        Aggiungi
      </Button>
    </Form>
  )
}

export default CommentForm
