# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name        = 'doo_iconik'
  s.version     = '1.0.0'
  s.summary     = '595 hand-drawn doodle style icons for Ruby on Rails'
  s.description = 'View helpers and components for rendering doo-iconik SVG icons in Rails applications.'
  s.authors     = ['Ajentik']
  s.license     = 'MIT'
  s.files       = Dir['lib/**/*', 'app/**/*', 'data/**/*']
  s.require_paths = ['lib']

  s.required_ruby_version = '>= 2.7.0'

  s.add_dependency 'railties',   '>= 6.0'
  s.add_dependency 'actionview', '>= 6.0'
end
