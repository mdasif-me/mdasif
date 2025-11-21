# Documentary API - Postman Guide

This guide helps you test the Documentary API using Postman. Import the collection using the JSON provided below.

## Setup Instructions

1. **Create Environment in Postman:**
   - Click "Environments" → "Create New"
   - Name: `Documentary Dev`
   - Add variables:
     - `base_url`: `http://localhost:3000`
     - `secret_key`: Your `DOCUMENTARY_SECRET_KEY` from `.env.local`
     - `doc_id`: Leave empty (will be filled after creating)
     - `comment_id`: Leave empty (will be filled after creating)

2. **Import Collection:**
   - Copy the JSON below
   - Postman → Import → Paste raw text
   - Select the environment you created

## Postman Collection JSON

```json
{
  "info": {
    "name": "Documentary API",
    "description": "Complete API for managing documentaries, comments, and engagements",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Documentaries",
      "item": [
        {
          "name": "Get All Documentaries",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/documentaries?page=1&limit=10",
              "host": ["{{base_url}}"],
              "path": ["api", "documentaries"],
              "query": [
                {
                  "key": "page",
                  "value": "1"
                },
                {
                  "key": "limit",
                  "value": "10"
                },
                {
                  "key": "category",
                  "value": "Frontend",
                  "disabled": true
                },
                {
                  "key": "search",
                  "value": "react",
                  "disabled": true
                }
              ]
            }
          }
        },
        {
          "name": "Create Documentary",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "x-documentary-secret",
                "value": "{{secret_key}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"badge\": \"Tutorial\",\n  \"title\": \"Getting Started with Next.js 16\",\n  \"content\": \"<h2>Introduction</h2><p>Next.js is a React framework for production.</p><h2>Key Features</h2><ul><li>Server-side rendering</li><li>Static generation</li><li>API routes</li></ul>\",\n  \"thumbnail\": \"https://via.placeholder.com/800x400?text=Next.js+Tutorial\",\n  \"description\": \"Complete guide to Next.js 16 with App Router and latest features\",\n  \"category\": \"Framework\",\n  \"isPublished\": true\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/documentaries",
              "host": ["{{base_url}}"],
              "path": ["api", "documentaries"]
            }
          }
        },
        {
          "name": "Get Single Documentary",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/documentaries/{{doc_id}}",
              "host": ["{{base_url}}"],
              "path": ["api", "documentaries", "{{doc_id}}"]
            }
          }
        },
        {
          "name": "Update Documentary",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "x-documentary-secret",
                "value": "{{secret_key}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Getting Started with Next.js 16 - Updated\",\n  \"description\": \"Updated guide with more examples\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/documentaries/{{doc_id}}",
              "host": ["{{base_url}}"],
              "path": ["api", "documentaries", "{{doc_id}}"]
            }
          }
        },
        {
          "name": "Delete Documentary",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "x-documentary-secret",
                "value": "{{secret_key}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/api/documentaries/{{doc_id}}",
              "host": ["{{base_url}}"],
              "path": ["api", "documentaries", "{{doc_id}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Comments",
      "item": [
        {
          "name": "Get Comments for Documentary",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/comments?documentaryId={{doc_id}}&page=1&limit=10",
              "host": ["{{base_url}}"],
              "path": ["api", "comments"],
              "query": [
                {
                  "key": "documentaryId",
                  "value": "{{doc_id}}"
                },
                {
                  "key": "page",
                  "value": "1"
                },
                {
                  "key": "limit",
                  "value": "10"
                }
              ]
            }
          }
        },
        {
          "name": "Create Comment",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"documentaryId\": \"{{doc_id}}\",\n  \"author\": \"John Developer\",\n  \"email\": \"john@example.com\",\n  \"content\": \"This is a great tutorial! Very comprehensive and well-explained. Can't wait for part 2.\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/comments",
              "host": ["{{base_url}}"],
              "path": ["api", "comments"]
            }
          }
        },
        {
          "name": "Create Comment Reply",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"documentaryId\": \"{{doc_id}}\",\n  \"author\": \"Jane Expert\",\n  \"email\": \"jane@example.com\",\n  \"content\": \"Thanks for the thoughtful comment! We're working on advanced topics next.\",\n  \"parentCommentId\": \"{{comment_id}}\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/comments",
              "host": ["{{base_url}}"],
              "path": ["api", "comments"]
            }
          }
        },
        {
          "name": "Update Comment",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"content\": \"Updated comment - I found a typo in section 3.\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/comments/{{comment_id}}",
              "host": ["{{base_url}}"],
              "path": ["api", "comments", "{{comment_id}}"]
            }
          }
        },
        {
          "name": "Delete Comment",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/comments/{{comment_id}}",
              "host": ["{{base_url}}"],
              "path": ["api", "comments", "{{comment_id}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Engagements (Likes/Dislikes)",
      "item": [
        {
          "name": "Like Documentary",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"targetId\": \"{{doc_id}}\",\n  \"targetType\": \"documentary\",\n  \"engagementType\": \"like\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/engagements",
              "host": ["{{base_url}}"],
              "path": ["api", "engagements"]
            }
          }
        },
        {
          "name": "Dislike Documentary",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"targetId\": \"{{doc_id}}\",\n  \"targetType\": \"documentary\",\n  \"engagementType\": \"dislike\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/engagements",
              "host": ["{{base_url}}"],
              "path": ["api", "engagements"]
            }
          }
        },
        {
          "name": "Like Comment",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"targetId\": \"{{comment_id}}\",\n  \"targetType\": \"comment\",\n  \"engagementType\": \"like\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/engagements",
              "host": ["{{base_url}}"],
              "path": ["api", "engagements"]
            }
          }
        },
        {
          "name": "Get Engagement Stats",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/engagements?targetId={{doc_id}}&targetType=documentary",
              "host": ["{{base_url}}"],
              "path": ["api", "engagements"],
              "query": [
                {
                  "key": "targetId",
                  "value": "{{doc_id}}"
                },
                {
                  "key": "targetType",
                  "value": "documentary"
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```

## Testing Workflow

### 1. Create Environment Variables

- Set `base_url` to your server URL
- Set `secret_key` to your `DOCUMENTARY_SECRET_KEY`

### 2. Test Documentaries

1. **Create Documentary**
   - Use "Create Documentary" request
   - Copy the `_id` from response to `doc_id` environment variable

2. **Get Documentaries**
   - Test "Get All Documentaries"
   - Try with different filters

3. **Get Single Documentary**
   - Verify the documentary is incremented views

### 3. Test Comments

1. **Create Comment**
   - Use the `doc_id` from previous step
   - Copy the `_id` from response to `comment_id`

2. **Create Reply**
   - Use the `comment_id` from previous step
   - Set `parentCommentId` to the comment you're replying to

3. **Get Comments**
   - Verify all comments are returned

### 4. Test Engagements

1. **Like Documentary**
   - Use "Like Documentary" request
   - Check response for engagement confirmation

2. **Get Engagement Stats**
   - Verify the like count increased

3. **Like Comment**
   - Similar to documentary

4. **Change Engagement**
   - Dislike after liking
   - System should toggle engagement

## Authentication

### Secret Key Header

For operations requiring admin authentication, include:

```
x-documentary-secret: your-secret-key
```

### Operations Requiring Secret Key

- ✅ Create Documentary
- ✅ Update Documentary
- ✅ Delete Documentary

### Operations NOT Requiring Secret Key

- ✅ Get Documentaries
- ✅ Get Comments
- ✅ Create Comments
- ✅ Like/Dislike

## Response Examples

### Success Response (200/201)

```json
{
  "_id": "60d5ec49c1234567890abcde",
  "badge": "Tutorial",
  "title": "Getting Started with Next.js",
  "content": "...",
  "views": 10,
  "likes": 5,
  "dislikes": 1,
  "createdAt": "2025-11-21T10:00:00Z",
  "updatedAt": "2025-11-21T10:00:00Z"
}
```

### Error Response (400/401/500)

```json
{
  "error": "Missing required fields: badge, title, content"
}
```

## Tips for Testing

1. **Verify Authorization**: Try creating/updating without the secret key - should get 401
2. **Test Pagination**: Use different `page` and `limit` values
3. **Test Search**: Try searching for keywords
4. **Test Edge Cases**: Try invalid IDs, empty fields, etc.
5. **Monitor Collections**: Watch your MongoDB collections grow
6. **Check IP Detection**: Try from different networks (engagement anonymousId should change)

## Common Issues

| Issue              | Solution                                              |
| ------------------ | ----------------------------------------------------- |
| 401 Unauthorized   | Verify `x-documentary-secret` header is set correctly |
| 404 Not Found      | Verify the ID exists in MongoDB                       |
| Invalid ObjectId   | Make sure you're using 24-character hex strings       |
| CORS Error         | Check next.config.ts CORS headers                     |
| Connection Refused | Verify MongoDB connection string is correct           |

## Next Steps

After testing:

1. Integrate components in your pages
2. Add proper styling and animations
3. Implement verification system
4. Set up rate limiting
5. Add moderation features
6. Deploy to production

For more details, see `DOCUMENTARY_SETUP.md`
