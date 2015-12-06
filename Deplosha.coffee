set 'hosts',          ['deploy@188.226.234.24:4321']
set 'repository',     'https://github.com/mrGhosd/e-study-frontend.git'
set 'branch',         'master'

envKit 'production', ->
  set 'hosts', ['deploy@188.226.234.24:4321']
  set 'env', 'production'

envKit 'development', ->
  set 'env', 'production'


set 'deployTo',       '/home/deploy/client'
set 'releaseName',    (new Date()).toJSON().replace(/\:|\-/g, '').replace(/\T/g, '-').replace(/\..+$/, '')
set 'keepReleases',   3

set 'timeStartDeploy', (new Date().getTime() / 1000)


namespace 'deploy', ->
  task 'update', (done) -> sequence 'prepare', 'updateCode', 'config', 'build', 'symlink', done

  task 'build', (done) ->
    run """
    cd #{deplosha.releasePath};
    NODE_ENV=production npm run build
    """, done

  task 'config', (done) ->
    run "cp #{deplosha.sharedPath}/webpack.config.js #{deplosha.releasePath}/app/webpack.config.js", done

  task 'restart', (done) ->
    run "echo 'Deploy not need restart'"
    done()

  task 'start', (done) ->
    run "cd #{deplosha.currentPath}; NODE_ENV=production npm run build", done

  task 'stop', (done) ->
    run "cd #{deplosha.currentPath}; npm run clean", done
