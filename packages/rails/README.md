# doo_iconik

[![Gem Version](https://img.shields.io/gem/v/doo_iconik.svg)](https://rubygems.org/gems/doo_iconik)

Rails helper gem: 595 hand-drawn doodle-style SVG icons for Rails 6+.

Part of [doo-iconik](https://github.com/ajentik/doo-iconik).

## Install

Add to your `Gemfile`:

```ruby
gem 'doo_iconik'
```

Then run:

```bash
bundle install
```

## Usage

### View Helper

```erb
<%= doo_iconik 'heart' %>
<%= doo_iconik 'heart', size: 'lg' %>
<%= doo_iconik 'star', size: 'md', spin: true %>
<%= doo_iconik 'arrow-right', flip_horizontal: true %>
```

### With Additional HTML Attributes

```erb
<%= doo_iconik 'heart', size: 'lg', class: 'text-red-500', id: 'fav-icon' %>
```

## Props

All helpers accept: `name`, `size`, `spin`, `pulse`, `bounce`, `flip_horizontal`, `flip_vertical`, `variant`, `animation`.

See the [main documentation](https://github.com/ajentik/doo-iconik#props) for full prop details.

## License

MIT
