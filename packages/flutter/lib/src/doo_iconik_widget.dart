import 'package:flutter/material.dart';
import 'icon_data.dart';

enum DooIconikSize { xs, sm, md, lg, xl, xxl }

enum DooIconikVariant {
  defaultVariant,
  glow,
  neon,
  shadow,
  embossed,
  glass,
  outline,
  retro,
}

enum DooIconikAnimation {
  spin,
  pulse,
  bounce,
  wiggle,
  shake,
  float,
  heartbeat,
  tada,
  rubber,
  swing,
  jello,
}

class DooIconik extends StatelessWidget {
  final String name;
  final DooIconikSize size;
  final double? customSize;
  final bool spin;
  final bool pulse;
  final bool bounce;
  final bool flipHorizontal;
  final bool flipVertical;
  final Color? color;
  final DooIconikVariant variant;
  final DooIconikAnimation? animation;
  final String? semanticLabel;

  const DooIconik({
    super.key,
    required this.name,
    this.size = DooIconikSize.md,
    this.customSize,
    this.spin = false,
    this.pulse = false,
    this.bounce = false,
    this.flipHorizontal = false,
    this.flipVertical = false,
    this.color,
    this.variant = DooIconikVariant.defaultVariant,
    this.animation,
    this.semanticLabel,
  });

  static const _sizeMap = {
    DooIconikSize.xs: 12.0,
    DooIconikSize.sm: 16.0,
    DooIconikSize.md: 24.0,
    DooIconikSize.lg: 32.0,
    DooIconikSize.xl: 48.0,
    DooIconikSize.xxl: 64.0,
  };

  double get _pixelSize => customSize ?? _sizeMap[size]!;

  @override
  Widget build(BuildContext context) {
    final data = iconData[name];
    if (data == null) return const SizedBox.shrink();

    final iconColor =
        color ??
        IconTheme.of(context).color ??
        Theme.of(context).colorScheme.onSurface;

    Widget icon = CustomPaint(
      size: Size(_pixelSize, _pixelSize),
      painter: _DooIconikPainter(data: data, color: iconColor),
    );

    // Apply variant effects
    if (variant != DooIconikVariant.defaultVariant) {
      icon = _applyVariant(icon, variant, iconColor);
    }

    // Apply transforms
    if (flipHorizontal || flipVertical) {
      icon = Transform(
        alignment: Alignment.center,
        transform: Matrix4.identity()
          ..scale(flipHorizontal ? -1.0 : 1.0, flipVertical ? -1.0 : 1.0),
        child: icon,
      );
    }

    // Apply animations — animation prop takes precedence over booleans
    if (animation != null) {
      icon = _applyAnimation(icon, animation!);
    } else {
      if (spin) icon = _SpinAnimation(child: icon);
      if (pulse) icon = _PulseAnimation(child: icon);
      if (bounce) icon = _BounceAnimation(child: icon);
    }

    Widget result = SizedBox(width: _pixelSize, height: _pixelSize, child: icon);

    if (semanticLabel != null) {
      result = Semantics(
        label: semanticLabel,
        image: true,
        excludeSemantics: true,
        child: result,
      );
    } else {
      result = ExcludeSemantics(child: result);
    }

    return result;
  }
}

class _DooIconikPainter extends CustomPainter {
  final DooIconikData data;
  final Color color;

  _DooIconikPainter({required this.data, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final scaleX = size.width / data.width;
    final scaleY = size.height / data.height;

    final paint = Paint()..color = color;

    if (data.stroke) {
      paint
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.0 * scaleX
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round;
    } else {
      paint.style = PaintingStyle.fill;
    }

    canvas.scale(scaleX, scaleY);

    for (final pathStr in data.paths) {
      try {
        final path = _parseSvgPath(pathStr);
        canvas.drawPath(path, paint);
      } catch (_) {}
    }

    if (data.circles != null) {
      for (final c in data.circles!) {
        canvas.drawCircle(Offset(c['cx']!, c['cy']!), c['r']!, paint);
      }
    }

    if (data.lines != null) {
      for (final l in data.lines!) {
        canvas.drawLine(
          Offset(l['x1']!, l['y1']!),
          Offset(l['x2']!, l['y2']!),
          paint,
        );
      }
    }
  }

  @override
  bool shouldRepaint(covariant _DooIconikPainter old) =>
      old.data != data || old.color != color;
}

// Simple SVG path parser supporting M, L, C, Z, Q, A commands
Path _parseSvgPath(String d) {
  final path = Path();
  final regex = RegExp(
    r'([MmLlHhVvCcSsQqTtAaZz])\s*([^MmLlHhVvCcSsQqTtAaZz]*)',
  );
  double cx = 0, cy = 0;

  for (final match in regex.allMatches(d)) {
    final cmd = match.group(1)!;
    final argsStr = match.group(2)?.trim() ?? '';
    final nums = RegExp(
      r'-?[\d.]+',
    ).allMatches(argsStr).map((m) => double.parse(m.group(0)!)).toList();

    switch (cmd) {
      case 'M':
        if (nums.length >= 2) {
          cx = nums[0];
          cy = nums[1];
          path.moveTo(cx, cy);
        }
        for (int i = 2; i + 1 < nums.length; i += 2) {
          cx = nums[i];
          cy = nums[i + 1];
          path.lineTo(cx, cy);
        }
        break;
      case 'm':
        if (nums.length >= 2) {
          cx += nums[0];
          cy += nums[1];
          path.moveTo(cx, cy);
        }
        break;
      case 'L':
        for (int i = 0; i + 1 < nums.length; i += 2) {
          cx = nums[i];
          cy = nums[i + 1];
          path.lineTo(cx, cy);
        }
        break;
      case 'l':
        for (int i = 0; i + 1 < nums.length; i += 2) {
          cx += nums[i];
          cy += nums[i + 1];
          path.lineTo(cx, cy);
        }
        break;
      case 'H':
        if (nums.isNotEmpty) {
          cx = nums[0];
          path.lineTo(cx, cy);
        }
        break;
      case 'h':
        if (nums.isNotEmpty) {
          cx += nums[0];
          path.lineTo(cx, cy);
        }
        break;
      case 'V':
        if (nums.isNotEmpty) {
          cy = nums[0];
          path.lineTo(cx, cy);
        }
        break;
      case 'v':
        if (nums.isNotEmpty) {
          cy += nums[0];
          path.lineTo(cx, cy);
        }
        break;
      case 'C':
        for (int i = 0; i + 5 < nums.length; i += 6) {
          path.cubicTo(
            nums[i],
            nums[i + 1],
            nums[i + 2],
            nums[i + 3],
            nums[i + 4],
            nums[i + 5],
          );
          cx = nums[i + 4];
          cy = nums[i + 5];
        }
        break;
      case 'c':
        for (int i = 0; i + 5 < nums.length; i += 6) {
          path.cubicTo(
            cx + nums[i],
            cy + nums[i + 1],
            cx + nums[i + 2],
            cy + nums[i + 3],
            cx + nums[i + 4],
            cy + nums[i + 5],
          );
          cx += nums[i + 4];
          cy += nums[i + 5];
        }
        break;
      case 'Q':
        for (int i = 0; i + 3 < nums.length; i += 4) {
          path.quadraticBezierTo(
            nums[i],
            nums[i + 1],
            nums[i + 2],
            nums[i + 3],
          );
          cx = nums[i + 2];
          cy = nums[i + 3];
        }
        break;
      case 'q':
        for (int i = 0; i + 3 < nums.length; i += 4) {
          path.quadraticBezierTo(
            cx + nums[i],
            cy + nums[i + 1],
            cx + nums[i + 2],
            cy + nums[i + 3],
          );
          cx += nums[i + 2];
          cy += nums[i + 3];
        }
        break;
      case 'Z':
      case 'z':
        path.close();
        break;
    }
  }
  return path;
}

// Animation widgets
class _SpinAnimation extends StatefulWidget {
  final Widget child;
  const _SpinAnimation({required this.child});
  @override
  State<_SpinAnimation> createState() => _SpinAnimationState();
}

class _SpinAnimationState extends State<_SpinAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) =>
      RotationTransition(turns: _ctrl, child: widget.child);
}

class _PulseAnimation extends StatefulWidget {
  final Widget child;
  const _PulseAnimation({required this.child});
  @override
  State<_PulseAnimation> createState() => _PulseAnimationState();
}

class _PulseAnimationState extends State<_PulseAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => FadeTransition(
    opacity: Tween(begin: 0.5, end: 1.0).animate(_ctrl),
    child: widget.child,
  );
}

class _BounceAnimation extends StatefulWidget {
  final Widget child;
  const _BounceAnimation({required this.child});
  @override
  State<_BounceAnimation> createState() => _BounceAnimationState();
}

class _BounceAnimationState extends State<_BounceAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => SlideTransition(
    position: Tween(
      begin: Offset.zero,
      end: const Offset(0, -0.25),
    ).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut)),
    child: widget.child,
  );
}

// Variant application
Widget _applyVariant(Widget icon, DooIconikVariant variant, Color color) {
  switch (variant) {
    case DooIconikVariant.glow:
      return Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: color.withAlpha(128),
              blurRadius: 6,
              spreadRadius: 0,
            ),
            BoxShadow(
              color: color.withAlpha(77),
              blurRadius: 12,
              spreadRadius: 0,
            ),
          ],
        ),
        child: icon,
      );
    case DooIconikVariant.neon:
      return Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: color.withAlpha(128),
              blurRadius: 4,
              spreadRadius: 0,
            ),
            BoxShadow(
              color: color.withAlpha(102),
              blurRadius: 8,
              spreadRadius: 0,
            ),
            BoxShadow(
              color: color.withAlpha(77),
              blurRadius: 16,
              spreadRadius: 0,
            ),
            BoxShadow(
              color: color.withAlpha(51),
              blurRadius: 32,
              spreadRadius: 0,
            ),
          ],
        ),
        child: icon,
      );
    case DooIconikVariant.shadow:
      return Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(64),
              blurRadius: 3,
              offset: const Offset(2, 3),
            ),
          ],
        ),
        child: icon,
      );
    case DooIconikVariant.glass:
      return Opacity(opacity: 0.55, child: icon);
    case DooIconikVariant.embossed:
      return Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(77),
              blurRadius: 0,
              offset: const Offset(1, 1),
            ),
            BoxShadow(
              color: Colors.white.withAlpha(102),
              blurRadius: 0,
              offset: const Offset(-1, -1),
            ),
          ],
        ),
        child: icon,
      );
    case DooIconikVariant.retro:
      return ColorFiltered(
        colorFilter: const ColorFilter.matrix(<double>[
          0.393,
          0.769,
          0.189,
          0,
          0,
          0.349,
          0.686,
          0.168,
          0,
          0,
          0.272,
          0.534,
          0.131,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
        ]),
        child: icon,
      );
    case DooIconikVariant.outline:
    case DooIconikVariant.defaultVariant:
      return icon;
  }
}

// Animation dispatcher
Widget _applyAnimation(Widget icon, DooIconikAnimation animation) {
  switch (animation) {
    case DooIconikAnimation.spin:
      return _SpinAnimation(child: icon);
    case DooIconikAnimation.pulse:
      return _PulseAnimation(child: icon);
    case DooIconikAnimation.bounce:
      return _BounceAnimation(child: icon);
    case DooIconikAnimation.wiggle:
      return _WiggleAnimation(child: icon);
    case DooIconikAnimation.shake:
      return _ShakeAnimation(child: icon);
    case DooIconikAnimation.float:
      return _FloatAnimation(child: icon);
    case DooIconikAnimation.heartbeat:
      return _HeartbeatAnimation(child: icon);
    case DooIconikAnimation.tada:
      return _TadaAnimation(child: icon);
    case DooIconikAnimation.rubber:
      return _RubberAnimation(child: icon);
    case DooIconikAnimation.swing:
      return _SwingAnimation(child: icon);
    case DooIconikAnimation.jello:
      return _JelloAnimation(child: icon);
  }
}

// New animation widgets

class _WiggleAnimation extends StatefulWidget {
  final Widget child;
  const _WiggleAnimation({required this.child});
  @override
  State<_WiggleAnimation> createState() => _WiggleAnimationState();
}

class _WiggleAnimationState extends State<_WiggleAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, child) {
        final t = _ctrl.value;
        double angle = 0;
        if (t < 0.25)
          angle = -5.0 * (t / 0.25);
        else if (t < 0.75)
          angle = -5.0 + 10.0 * ((t - 0.25) / 0.5);
        else
          angle = 5.0 - 5.0 * ((t - 0.75) / 0.25);
        return Transform.rotate(angle: angle * 3.14159 / 180, child: child);
      },
      child: widget.child,
    );
  }
}

class _ShakeAnimation extends StatefulWidget {
  final Widget child;
  const _ShakeAnimation({required this.child});
  @override
  State<_ShakeAnimation> createState() => _ShakeAnimationState();
}

class _ShakeAnimationState extends State<_ShakeAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, child) {
        final t = _ctrl.value;
        final offset = (t * 10).floor() % 2 == 0 ? -2.0 : 2.0;
        return Transform.translate(
          offset: Offset(t > 0 && t < 1 ? offset : 0, 0),
          child: child,
        );
      },
      child: widget.child,
    );
  }
}

class _FloatAnimation extends StatefulWidget {
  final Widget child;
  const _FloatAnimation({required this.child});
  @override
  State<_FloatAnimation> createState() => _FloatAnimationState();
}

class _FloatAnimationState extends State<_FloatAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => SlideTransition(
    position: Tween(
      begin: Offset.zero,
      end: const Offset(0, -0.15),
    ).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut)),
    child: widget.child,
  );
}

class _HeartbeatAnimation extends StatefulWidget {
  final Widget child;
  const _HeartbeatAnimation({required this.child});
  @override
  State<_HeartbeatAnimation> createState() => _HeartbeatAnimationState();
}

class _HeartbeatAnimationState extends State<_HeartbeatAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, child) {
        final t = _ctrl.value;
        double scale = 1.0;
        if (t < 0.14)
          scale = 1.0 + 0.3 * (t / 0.14);
        else if (t < 0.28)
          scale = 1.3 - 0.3 * ((t - 0.14) / 0.14);
        else if (t < 0.42)
          scale = 1.0 + 0.3 * ((t - 0.28) / 0.14);
        else if (t < 0.70)
          scale = 1.3 - 0.3 * ((t - 0.42) / 0.28);
        return Transform.scale(scale: scale, child: child);
      },
      child: widget.child,
    );
  }
}

class _TadaAnimation extends StatefulWidget {
  final Widget child;
  const _TadaAnimation({required this.child});
  @override
  State<_TadaAnimation> createState() => _TadaAnimationState();
}

class _TadaAnimationState extends State<_TadaAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, child) {
        final t = _ctrl.value;
        double scale = 1.0, angle = 0.0;
        if (t < 0.1) {
          scale = 1.0 - 0.1 * (t / 0.1);
          angle = -3.0 * (t / 0.1);
        } else if (t < 0.2) {
          scale = 0.9;
          angle = -3.0;
        } else if (t < 0.8) {
          scale = 1.1;
          angle = ((((t - 0.2) / 0.1).floor()) % 2 == 0) ? 3.0 : -3.0;
        }
        return Transform.scale(
          scale: scale,
          child: Transform.rotate(angle: angle * 3.14159 / 180, child: child),
        );
      },
      child: widget.child,
    );
  }
}

class _RubberAnimation extends StatefulWidget {
  final Widget child;
  const _RubberAnimation({required this.child});
  @override
  State<_RubberAnimation> createState() => _RubberAnimationState();
}

class _RubberAnimationState extends State<_RubberAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, child) {
        final t = _ctrl.value;
        double sx = 1.0, sy = 1.0;
        if (t < 0.3) {
          sx = 1.0 + 0.25 * (t / 0.3);
          sy = 1.0 - 0.25 * (t / 0.3);
        } else if (t < 0.4) {
          sx = 0.75 + 0.5 * ((t - 0.3) / 0.1);
          sy = 1.25 - 0.5 * ((t - 0.3) / 0.1);
        } else if (t < 0.5) {
          sx = 1.15 - 0.2 * ((t - 0.4) / 0.1);
          sy = 0.85 + 0.2 * ((t - 0.4) / 0.1);
        }
        return Transform(
          alignment: Alignment.center,
          transform: Matrix4.identity()..scale(sx, sy),
          child: child,
        );
      },
      child: widget.child,
    );
  }
}

class _SwingAnimation extends StatefulWidget {
  final Widget child;
  const _SwingAnimation({required this.child});
  @override
  State<_SwingAnimation> createState() => _SwingAnimationState();
}

class _SwingAnimationState extends State<_SwingAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, child) {
        final t = _ctrl.value;
        double angle = 0;
        if (t < 0.2)
          angle = 15.0 * (t / 0.2);
        else if (t < 0.4)
          angle = 15.0 - 25.0 * ((t - 0.2) / 0.2);
        else if (t < 0.6)
          angle = -10.0 + 15.0 * ((t - 0.4) / 0.2);
        else if (t < 0.8)
          angle = 5.0 - 10.0 * ((t - 0.6) / 0.2);
        else
          angle = -5.0 + 5.0 * ((t - 0.8) / 0.2);
        return Transform.rotate(
          angle: angle * 3.14159 / 180,
          alignment: Alignment.topCenter,
          child: child,
        );
      },
      child: widget.child,
    );
  }
}

class _JelloAnimation extends StatefulWidget {
  final Widget child;
  const _JelloAnimation({required this.child});
  @override
  State<_JelloAnimation> createState() => _JelloAnimationState();
}

class _JelloAnimationState extends State<_JelloAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, child) {
        final t = _ctrl.value;
        double skew = 0;
        if (t > 0.111 && t < 0.222)
          skew = 0;
        else if (t >= 0.222 && t < 0.333)
          skew = -12.5 * ((t - 0.222) / 0.111);
        else if (t >= 0.333 && t < 0.444)
          skew = -12.5 + 18.75 * ((t - 0.333) / 0.111);
        else if (t >= 0.444 && t < 0.555)
          skew = 6.25 - 9.375 * ((t - 0.444) / 0.111);
        else if (t >= 0.555)
          skew = -3.125 + 3.125 * ((t - 0.555) / 0.445);
        final rad = skew * 3.14159 / 180;
        return Transform(
          alignment: Alignment.center,
          transform: Matrix4.skew(rad, rad),
          child: child,
        );
      },
      child: widget.child,
    );
  }
}
