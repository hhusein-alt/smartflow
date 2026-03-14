# Полный гайд: GitHub + Vercel для SmartFlow

Твой GitHub: **hhusein-alt**

---

## Часть 1. Деплой кода на GitHub (самый удобный способ)

### Вариант A: через GitHub Desktop (проще всего, без терминала)

1. **Скачай GitHub Desktop**  
   https://desktop.github.com/

2. **Войди в аккаунт**  
   File → Options → Accounts → Sign in to GitHub.com → логин **hhusein-alt**.

3. **Добавь локальную папку как репозиторий**
   - File → Add local repository
   - Укажи папку: `C:\Users\Lenovo\OneDrive\Desktop\smartflow\smartflow`  
     (именно та, где лежат `package.json`, папка `app`, `components` и т.д.)
   - Если пишет "this directory does not appear to be a Git repository":
     - File → New repository
     - Name: `smartflow`
     - Local path: `C:\Users\Lenovo\OneDrive\Desktop\smartflow`
     - Create repository
     - Потом перетащи в эту папку всё содержимое из `smartflow` (внутренней папки), чтобы в корне репо был `package.json`, или добавь как Add local repository папку `smartflow` (внутреннюю).

4. **Либо создай репо из текущей папки через терминал** (см. Вариант B), затем в GitHub Desktop: File → Add local repository → выбери `...\smartflow\smartflow`.

5. **Первый коммит**
   - В списке файлов отметь все (или оставь как есть).
   - Внизу в поле Summary напиши: `Initial commit`
   - Нажми **Commit to main**.

6. **Публикация на GitHub**
   - Кнопка **Publish repository**.
   - Name: `smartflow`.
   - Описание (по желанию): `SmartFlow — Urban Mobility Intelligence`.
   - Сними галочку "Keep this code private", если нужен публичный репо.
   - **Publish repository**.

Готово: репозиторий будет по адресу: **https://github.com/hhusein-alt/smartflow**

---

### Вариант B: через терминал (Git + GitHub CLI или только Git)

#### Шаг 1: Установка Git (если ещё нет)

- Скачай: https://git-scm.com/download/win  
- Установи с настройками по умолчанию.

#### Шаг 2: Открой терминал в папке проекта

В VS Code / Cursor: терминал уже открыт в workspace. Перейди в папку с приложением:

```powershell
cd C:\Users\Lenovo\OneDrive\Desktop\smartflow\smartflow
```

(Если ты уже в `smartflow` и видишь `package.json` при `dir`, то `cd smartflow` или просто оставайся здесь.)

#### Шаг 3: Проверь, есть ли уже Git

```powershell
git status
```

- Если видишь список файлов / "On branch ..." — репозиторий уже есть, переходи к шагу 5.
- Если "not a git repository" — выполни шаг 4.

#### Шаг 4: Инициализация репозитория (только если не было Git)

```powershell
git init
git branch -M main
```

#### Шаг 5: Добавь все файлы и первый коммит

```powershell
git add .
git status
git commit -m "Initial commit: SmartFlow landing"
```

#### Шаг 6: Создай репозиторий на GitHub

**Способ 1 — через сайт (без GitHub CLI):**

1. Зайди на https://github.com/new  
2. Repository name: **smartflow**  
3. Public, без README / .gitignore (у тебя уже есть .gitignore в проекте).  
4. Нажми **Create repository**.

**Способ 2 — через GitHub CLI (если установлен):**

```powershell
gh auth login
gh repo create smartflow --public --source=. --remote=origin --push
```

Если используешь способ 1 (сайт), после создания репо выполни в той же папке (подставь свой логин, если не hhusein-alt):

```powershell
git remote add origin https://github.com/hhusein-alt/smartflow.git
git push -u origin main
```

Введи логин **hhusein-alt** и пароль. Пароль — это не пароль от аккаунта, а **Personal Access Token**:

- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token.  
- Отметь scope **repo**.  
- Скопируй токен и вставляй его вместо пароля при `git push`.

После этого код будет на GitHub: **https://github.com/hhusein-alt/smartflow**

---

## Часть 2. Деплой на Vercel

### Шаг 1: Аккаунт Vercel

1. Зайди на https://vercel.com  
2. **Sign Up** → выбери **Continue with GitHub**.  
3. Разреши доступ Vercel к аккаунту **hhusein-alt**.

### Шаг 2: Импорт проекта

1. На главной Vercel нажми **Add New…** → **Project**.  
2. В списке репозиториев выбери **hhusein-alt/smartflow** (если не видишь — нажми **Configure GitHub App** и дай доступ к репо `smartflow`).  
3. Нажми **Import** рядом с репозиторием **smartflow**.

### Шаг 3: Настройки сборки

- **Framework Preset:** Next.js (подставится сам).  
- **Root Directory:** если в репо в корне лежит `package.json` (как в нашем гайде) — оставь пустым. Если в репо есть подпапка (например, весь код в папке `smartflow`) — нажми **Edit** и укажи `smartflow`.  
- **Build Command:** `npm run build` (по умолчанию).  
- **Output Directory:** не трогай (для Next.js автоматически).  
- **Install Command:** `npm install` (по умолчанию).

Переменные окружения (Environment Variables) пока не нужны — в проекте их нет.

### Шаг 4: Деплой

Нажми **Deploy**.  
Сборка займёт 1–3 минуты. В конце будет ссылка вида:

**https://smartflow-xxx.vercel.app**

(или свой домен, если настроишь в настройках проекта.)

### Шаг 5: Обновления в будущем

- **Через GitHub:** делаешь коммиты и пуши в `main`:
  ```powershell
  git add .
  git commit -m "описание изменений"
  git push
  ```
  Vercel сам соберёт и задеплоит новый вариант.

- **Через GitHub Desktop:** делаешь коммит и нажимаешь **Push origin**.

---

## Краткий чеклист

- [ ] Git установлен / репозиторий инициализирован в папке с `package.json`
- [ ] Все файлы добавлены, выполнен первый коммит
- [ ] Репозиторий **smartflow** создан на GitHub (hhusein-alt/smartflow)
- [ ] Код запушен: `git push -u origin main`
- [ ] Аккаунт Vercel привязан к GitHub
- [ ] Проект импортирован из hhusein-alt/smartflow
- [ ] Root Directory выставлен только если приложение в подпапке репо
- [ ] Deploy выполнен, ссылка на сайт открывается

Готово: твой сайт в сети, обновления — через пуш в GitHub.
