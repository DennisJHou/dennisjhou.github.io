# 📧 啟用「訪客留言 → 立刻自動回信」功能（約 5 分鐘）

網站表單已全部寫好，只差一步：**把你的 Gmail（chia.an.hou@gmail.com）授權給 EmailJS**。
這一步涉及登入你的 Google 帳號，必須由你本人完成。完成後訪客按下送出，就會立刻收到一封由 chia.an.hou@gmail.com 寄出的確認信，並 CC 到 love2002yy@gmail.com。

## 步驟

### 1. 註冊 EmailJS（免費，每月 200 封）
前往 <https://www.emailjs.com> → **Sign Up**（建議直接用 Google 帳號 chia.an.hou@gmail.com 註冊）。

### 2. 連接 Gmail 服務
1. 左側選單 **Email Services** → **Add New Service** → 選 **Gmail**。
2. 點 **Connect Account**，登入並授權 **chia.an.hou@gmail.com**（勾選允許寄信權限）。
3. 建立後記下 **Service ID**（例如 `service_abc123`）。

### 3. 建立信件模板
左側選單 **Email Templates** → **Create New Template**，照下面填：

| 欄位 | 填入內容 |
|---|---|
| **To Email** | `{{visitor_email}}` |
| **From Name** | `Chia-An (Dennis) Hou` |
| **CC** | `love2002yy@gmail.com` |
| **Subject** | `Thanks for reaching out! I've received your message` |

**Content（內文）貼上：**

```
Hi there,

Thank you for visiting my website and leaving a message — this is a quick
confirmation that I've received it.

Here's what you sent me ({{sent_at}}):

────────────────────────────
{{visitor_message}}
────────────────────────────

I'll get back to you as soon as I can. Talk soon!

Best regards,
Chia-An (Dennis) Hou
National Taiwan University, Department of Psychology
chia.an.hou@gmail.com
```

儲存後記下 **Template ID**（例如 `template_xyz789`）。

### 4. 取得 Public Key
右上角頭像 → **Account** → 複製 **Public Key**。

### 5. 填回網站
打開 [`script.js`](script.js) 最上方，把三個值填進去：

```js
const EMAILJS_CONFIG = {
  publicKey: "你的 Public Key",
  serviceId: "你的 Service ID",
  templateId: "你的 Template ID",
};
```

然後 commit + push：

```bash
git add script.js && git commit -m "Enable EmailJS" && git push
```

一兩分鐘後網站更新，功能即刻生效。✅

> 尚未設定完成前，訪客按送出會自動改開他的郵件軟體寄信給你（不會壞掉，只是沒有自動確認信）。
