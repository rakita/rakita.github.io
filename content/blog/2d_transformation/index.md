---
title: 2D UI beginner guide. Learn to rotate/translate/scale
date: "2018-05-01T22:12:03.284Z"
author: "draganrakita"
description: "2D UI beginner guide. Learn to rotate/translate/scale"
---

Recently I had pleasure to make UI for standard rotate/scale/translate (or RST) controls on element with some bounding box. I told myself: great! this will be easy!Okay, lets google it, make some matrices and will be quickly finished... must say that it took me a bit longer. Internet didn't help me with comprehensive solution or guide, i needed to stitch stuff together, and at the end of my frustration I got inspired to write this.
I will give small intro about rotation and translation because they can be easily implemented and will focus my attention to scaling that made me warm around my hearth (or maybe that was my frustration).

# Transformations

Transformation for 2D is constituted of tree things: Rotation, Scaling and Translation and all three things can be represented with one 2x3 matrix (but because of conformity that square matrix multiplication give us we add some zero padding and use 3x3). When thinking about matrix most of times I see only a black box, nothing more, i know what i can do with them, and avoid manually setting things. Another things that we need to take care when matrixing is order on how we do transformation, it matters, `T*V` is not same as `V*T`.

Some info on our setup. Our original element (before transformations), has some size (original_size), its is rectangular shape (or his bounding box is), it lies in first quadrant with starting position at coordinate beginning. We are using row major order matrices (This means order of multiplication of matrices is from left to right `Mfirst*Msecond`)  additionally, we are using these points:

* `ref_point`: point from where transformation is started for rotation/scale this is corner that we selected, for translation this is point where user clicked and started to drag our element.
* `current_point`: current mouse point, it represent where we want to rotate/scale/translate
* `M` : transformation matrix that was already applied on our element.
* `anchor_point`: other side from ref_point, (opposite corner or side). Needed for scaling.
* `center_point` : ref_point-anchor_point 
* `original_size`: Original size of our element (For some systems element can be normalized to (1,1), but for this example i think it is better to show how size affects us).

Okay, lets get started from easy to hard:

## Translation

Translation is most simple of them all, it moves point by specified vector, and nothing more. It is used in tandem with rotation or scaling to center already moved/rotated element, but this will be explained in due time. For our UI you take point when mouse is clicked `ref_point`. And take current point where mouse moves `current_point`. get diff and create translation matrix as this `M=M*translation(current_point-ref_point)` and voila, we are done.

## Rotation

Rotation is little bit more complex (it has little bit more to do) but in same rank as translation. We need reference point `ref_point` for selected element. Rotation is usually, not to say always, done around element center, for this we need `center_point`. And lastly we have `current_point`. As you can guest we need to find the angle between these two vectors `ref_point-center_point` and \
`current_point-center_point`, after consulting internet we get this equation:`angle = atan2(norm(cross(x,y)), dot(x,y))`. With angle found we can create matrix R with something like rotation(angle).  Appending R to transformation matrix M is done with this simple but very used and important trick: We create another matrix of translation from elements center `T=translation(center_point)`, and it's reverse `Tinv = inverse(T)`. Multiply them in this order: `M=M*Tinv*R*T` , and we get our final transformation. Basically, with Tinv we just nullified translation, we then rotate our element around center and apply T to put it back to old position.