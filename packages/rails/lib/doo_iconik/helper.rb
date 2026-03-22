# frozen_string_literal: true

module DooIconik
  module Helper
    def doo_iconik(name, size: :md, spin: false, pulse: false, bounce: false,
                   flip_horizontal: false, flip_vertical: false,
                   variant: :default, animation: nil, aria_label: nil, **html_options)
      icon = DooIconik.icon(name)
      return nil unless icon

      pixel_size = resolve_size(size)
      classes = build_classes(spin, pulse, bounce, animation, variant, html_options.delete(:class))
      transform = build_transform(flip_horizontal, flip_vertical)

      svg_attrs = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: icon['viewBox'],
        width: pixel_size,
        height: pixel_size,
        class: classes.presence,
        style: transform ? "transform: #{transform}" : nil,
        'aria-hidden': aria_label ? nil : 'true',
        'aria-label': aria_label,
        role: aria_label ? 'img' : nil
      }

      if icon['stroke']
        svg_attrs[:fill] = 'none'
        svg_attrs[:stroke] = 'currentColor'
        svg_attrs[:'stroke-width'] = 2
        svg_attrs[:'stroke-linecap'] = 'round'
        svg_attrs[:'stroke-linejoin'] = 'round'
      else
        svg_attrs[:fill] = 'currentColor'
      end

      svg_attrs.merge!(html_options)
      svg_attrs.compact!

      content = safe_join([
        *icon['paths'].map { |d| tag.path(d: d) },
        *(icon['circles'] || []).map { |c| tag.circle(cx: c['cx'], cy: c['cy'], r: c['r']) },
        *(icon['lines'] || []).map { |l| tag.line(x1: l['x1'], y1: l['y1'], x2: l['x2'], y2: l['y2']) }
      ])

      tag.svg(content, **svg_attrs)
    end

    private

    def resolve_size(size)
      return size if size.is_a?(Integer)

      DooIconik::SIZES[size.to_sym] || 24
    end

    def build_classes(spin, pulse, bounce, animation, variant, extra_class)
      classes = []
      if animation
        classes << "doo-iconik-#{animation}"
      else
        classes << 'doo-iconik-spin' if spin
        classes << 'doo-iconik-pulse' if pulse
        classes << 'doo-iconik-bounce' if bounce
      end
      classes << "doo-iconik-#{variant}" if variant && variant.to_s != 'default'
      classes << extra_class if extra_class.present?
      classes.join(' ')
    end

    def build_transform(flip_h, flip_v)
      transforms = []
      transforms << 'scaleX(-1)' if flip_h
      transforms << 'scaleY(-1)' if flip_v
      transforms.any? ? transforms.join(' ') : nil
    end
  end
end
