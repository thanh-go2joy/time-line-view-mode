var FUNC_ERROR_TEXT = 'Expected a function'

var nativeMax = Math.max
var nativeMin = Math.min
function debounce (func, wait, options) {
  var lastArgs
  var lastThis
  var maxWait
  var result
  var timerId
  var lastCallTime
  var lastInvokeTime = 0
  var leading = false
  var maxing = false
  var trailing = true

  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  if (options !== null && (typeof options === 'object' || typeof options === 'function')) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? nativeMax(options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc (time) {
    var args = lastArgs
    var thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge (time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime
    var timeWaiting = wait - timeSinceLastCall

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired () {
    var time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge (time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel () {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function debounced () {
    var time = Date.now()
    var isInvoking = shouldInvoke(time)

    lastArgs = arguments
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId)
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

const scrollToTop = (selector) => {
  setTimeout(() => {
    const el = document.querySelector(selector)
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 300)
}

export {
  debounce,
  scrollToTop
}
