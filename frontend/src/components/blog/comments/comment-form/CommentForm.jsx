import { Button, Form } from 'react-bootstrap'

const CommentForm = ({ form, onChange, onSubmit, submitting }) => {
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
        rows={2}
        name="comment"
        placeholder="Scrivi un commento..."
        value={form.comment}
        onChange={onChange}
      />

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
