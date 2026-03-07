'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { Plus, Edit, Trash2, Send } from 'lucide-react'

interface NewsletterContent {
  id: string
  title: string
  content: string
  image_url?: string
  published_at?: string
  status: string
  created_at: string
}

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<NewsletterContent[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
  })
  const supabase = createClient()

  useEffect(() => {
    fetchNewsletters()
  }, [])

  const fetchNewsletters = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_content')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNewsletters(data || [])
    } catch (error) {
      console.log('Error fetching newsletters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNewsletter = async (status: string) => {
    if (!formData.title || !formData.content) {
      alert('Title and content are required')
      return
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('newsletter_content')
          .update({
            ...formData,
            status,
            published_at: status === 'published' ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase.from('newsletter_content').insert([
          {
            ...formData,
            status,
            published_at: status === 'published' ? new Date().toISOString() : null,
          },
        ])

        if (error) throw error
      }

      setFormData({ title: '', content: '', image_url: '' })
      setEditingId(null)
      setShowAddForm(false)
      fetchNewsletters()
    } catch (error) {
      console.log('Error saving newsletter:', error)
      alert('Error saving newsletter')
    }
  }

  const handleEdit = (newsletter: NewsletterContent) => {
    setFormData({
      title: newsletter.title,
      content: newsletter.content,
      image_url: newsletter.image_url || '',
    })
    setEditingId(newsletter.id)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this newsletter?')) return

    try {
      const { error } = await supabase.from('newsletter_content').delete().eq('id', id)

      if (error) throw error
      fetchNewsletters()
    } catch (error) {
      console.log('Error deleting newsletter:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Newsletter Management</h1>
          <p className="text-slate-400 mt-2">Create and manage newsletter content</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Newsletter
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-slate-800 border-slate-700 p-6">
          <div className="space-y-4">
            <h3 className="font-bold text-white">{editingId ? 'Edit Newsletter' : 'Create Newsletter'}</h3>
            <Input
              placeholder="Newsletter Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <textarea
              placeholder="Newsletter Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 w-full min-h-[200px]"
            />
            <Input
              placeholder="Image URL (optional)"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <div className="flex gap-2">
              <Button onClick={() => handleSaveNewsletter('draft')}>Save as Draft</Button>
              <Button onClick={() => handleSaveNewsletter('published')} className="bg-blue-600 hover:bg-blue-700">
                <Send className="mr-2 h-4 w-4" />
                Publish
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingId(null)
                  setFormData({ title: '', content: '', image_url: '' })
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="text-center text-slate-400">Loading newsletters...</div>
      ) : (
        <div className="grid gap-4">
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id} className="bg-slate-800 border-slate-700 p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{newsletter.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        newsletter.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : newsletter.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {newsletter.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">{newsletter.content}</p>
                  {newsletter.published_at && (
                    <p className="text-slate-500 text-xs">Published: {new Date(newsletter.published_at).toLocaleDateString()}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(newsletter)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(newsletter.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
